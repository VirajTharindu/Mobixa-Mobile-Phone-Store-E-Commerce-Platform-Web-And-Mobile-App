import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/mock_data.dart';

// --- Cart State ---

class CartItem {
  final Product product;
  int quantity;
  final String color;
  final String option;

  CartItem({
    required this.product,
    this.quantity = 1,
    required this.color,
    required this.option,
  });

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CartItem &&
          runtimeType == other.runtimeType &&
          product == other.product &&
          quantity == other.quantity &&
          color == other.color &&
          option == other.option;

  @override
  int get hashCode =>
      product.hashCode ^ quantity.hashCode ^ color.hashCode ^ option.hashCode;
}

class CartNotifier extends Notifier<List<CartItem>> {
  @override
  List<CartItem> build() => [];

  void addToCart(Product product, String color, String option) {
    final existingIndex = state.indexWhere((item) =>
        item.product.id == product.id &&
        item.color == color &&
        item.option == option);

    if (existingIndex != -1) {
      state = [
        for (int i = 0; i < state.length; i++)
          if (i == existingIndex)
            CartItem(
              product: state[i].product,
              quantity: state[i].quantity + 1,
              color: state[i].color,
              option: state[i].option,
            )
          else
            state[i]
      ];
    } else {
      state = [
        ...state,
        CartItem(product: product, color: color, option: option)
      ];
    }
  }

  void removeFromCart(CartItem item) {
    state = state.where((i) => i != item).toList();
  }

  void updateQuantity(CartItem item, int delta) {
    state = [
      for (final i in state)
        if (i == item)
          CartItem(
            product: i.product,
            quantity: (i.quantity + delta).clamp(1, 99),
            color: i.color,
            option: i.option,
          )
        else
          i
    ];
  }

  double get subtotal =>
      state.fold(0, (sum, item) => sum + (item.product.price * item.quantity));
}

final cartProvider = NotifierProvider<CartNotifier, List<CartItem>>(() {
  return CartNotifier();
});

// --- Comparison State ---

class ComparisonNotifier extends Notifier<List<Product>> {
  @override
  List<Product> build() => [];

  void toggleProduct(Product product) {
    if (state.any((p) => p.id == product.id)) {
      state = state.where((p) => p.id != product.id).toList();
    } else if (state.length < 2) {
      state = [...state, product];
    }
  }

  void removeProduct(String id) {
    state = state.where((p) => p.id != id).toList();
  }
}

final comparisonProvider =
    NotifierProvider<ComparisonNotifier, List<Product>>(() {
  return ComparisonNotifier();
});
