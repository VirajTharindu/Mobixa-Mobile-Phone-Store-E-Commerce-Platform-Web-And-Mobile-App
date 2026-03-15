import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';
import '../providers/app_providers.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartItems = ref.watch(cartProvider);
    final subtotal = ref.read(cartProvider.notifier).subtotal;
    final tax = subtotal * 0.08;
    final total = subtotal + tax;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "SHOPPING CART",
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: cartItems.isEmpty
          ? _buildEmptyState(context)
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildCartItems(ref, cartItems),
                  const SizedBox(height: 32),
                  _buildCheckoutPanel(context, subtotal, tax, total),
                ],
              ),
            ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(LucideIcons.shoppingBag, size: 80, color: Colors.white10),
          const SizedBox(height: 24),
          Text(
            "YOUR CART IS EMPTY",
            style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white38),
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text("START SHOPPING"),
          ),
        ],
      ),
    );
  }

  Widget _buildCartItems(WidgetRef ref, List<CartItem> items) {
    return Column(
      children: items.map((item) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: GlassCard(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.05),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.all(8),
                  child: Image.network(item.product.image, fit: BoxFit.contain),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Expanded(
                            child: Text(
                              item.product.name.toUpperCase(),
                              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Text(
                            "\$${item.product.price}",
                            style: const TextStyle(fontWeight: FontWeight.w900),
                          ),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        "${item.option} • ${item.color}".toUpperCase(),
                        style: const TextStyle(fontSize: 10, color: Colors.white38),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              color: AppTheme.background,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: Colors.white10),
                            ),
                            child: Row(
                              children: [
                                IconButton(
                                  icon: const Icon(LucideIcons.minus, size: 14),
                                  onPressed: () => ref.read(cartProvider.notifier).updateQuantity(item, -1),
                                ),
                                Text("${item.quantity}", style: const TextStyle(fontWeight: FontWeight.bold)),
                                IconButton(
                                  icon: const Icon(LucideIcons.plus, size: 14),
                                  onPressed: () => ref.read(cartProvider.notifier).updateQuantity(item, 1),
                                ),
                              ],
                            ),
                          ),
                          IconButton(
                            icon: const Icon(LucideIcons.trash2, size: 18, color: Colors.white38),
                            onPressed: () => ref.read(cartProvider.notifier).removeFromCart(item),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildCheckoutPanel(BuildContext context, double subtotal, double tax, double total) {
    return GlassCard(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "ORDER SUMMARY",
            style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1),
          ),
          const SizedBox(height: 24),
          _buildSummaryRow("Subtotal", "\$${subtotal.toStringAsFixed(2)}"),
          _buildSummaryRow("Shipping", "FREE", isFree: true),
          _buildSummaryRow("Estimated Taxes", "\$${tax.toStringAsFixed(2)}"),
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 16.0),
            child: Divider(color: Colors.white10),
          ),
          _buildSummaryRow("Total", "\$${total.toStringAsFixed(2)}", isTotal: true),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 60),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            child: const Text(
              "COMPLETE PURCHASE",
              style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 2),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value, {bool isFree = false, bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.white38)),
          Text(
            value,
            style: TextStyle(
              fontWeight: isTotal ? FontWeight.w900 : FontWeight.bold,
              fontSize: isTotal ? 18 : 14,
              color: isFree ? Color(0xFF10B981) : (isTotal ? AppTheme.primary : Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
