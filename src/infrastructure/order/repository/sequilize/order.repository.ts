import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id: entity.id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    entity.items.forEach(async (item) => {
      await OrderItemModel.upsert({
        id: item.id,
        product_id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        order_id: entity.id
      });
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(
      id,
      orderModel.customer_id,
      orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });

    const orders = orderModels.map((order) => new Order(
      order.id,
      order.customer_id,
      order.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))
    ));

    return orders;
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
