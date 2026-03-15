import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';
import '../providers/app_providers.dart';
import '../data/mock_data.dart';

class CompareScreen extends ConsumerWidget {
  const CompareScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final products = ref.watch(comparisonProvider);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "COMPARE DEVICES",
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.share2),
            onPressed: () {},
          ),
        ],
      ),
      body: products.isEmpty
          ? _buildEmptyState(context)
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  _buildProductHeaders(ref, products),
                  const SizedBox(height: 32),
                  _buildComparisonTable(products),
                  const SizedBox(height: 48),
                  _buildVerdictSection(),
                ],
              ),
            ),
    );
  }

  Widget _buildVerdictSection() {
    return Column(
      children: [
        _buildVerdictCard(
          "EXPERT VERDICT",
          "Based on current specs, the Galaxy S24 Ultra offers a more comprehensive hardware package, particularly in camera versatility.",
          LucideIcons.checkCircle,
          isPrimary: true,
        ),
        const SizedBox(height: 16),
        _buildVerdictCard(
          "PRICE HISTORY",
          "Both devices are at MSRP. Expect price cuts for Galaxy series in 3 months.",
          LucideIcons.trendingUp,
        ),
        const SizedBox(height: 16),
        _buildVerdictCard(
          "AVAILABILITY",
          "iPhone: In Stock\nGalaxy: Ships in 2 days",
          LucideIcons.truck,
        ),
      ],
    );
  }

  Widget _buildVerdictCard(String title, String content, IconData icon, {bool isPrimary = false}) {
    return GlassCard(
      padding: const EdgeInsets.all(24),
      opacity: isPrimary ? 0.9 : 0.4,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: isPrimary ? Colors.white : AppTheme.primary, size: 20),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 10, letterSpacing: 1),
                ),
                const SizedBox(height: 8),
                Text(
                  content,
                  style: const TextStyle(fontSize: 12, color: Colors.white70, height: 1.5),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(LucideIcons.columns, size: 80, color: Colors.white10),
          const SizedBox(height: 24),
          Text(
            "NO DEVICES TO COMPARE",
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
            child: const Text("BROWSE DEVICES"),
          ),
        ],
      ),
    );
  }

  Widget _buildProductHeaders(WidgetRef ref, List<Product> products) {
    return Row(
      children: [
        Expanded(child: _buildHeaderItem(ref, products[0])),
        const SizedBox(width: 16),
        Expanded(
          child: products.length > 1 
            ? _buildHeaderItem(ref, products[1])
            : _buildAddPlaceholder(),
        ),
      ],
    );
  }

  Widget _buildHeaderItem(WidgetRef ref, Product product) {
    return GlassCard(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          Align(
            alignment: Alignment.topRight,
            child: IconButton(
              icon: const Icon(LucideIcons.x, size: 14, color: Colors.white38),
              onPressed: () => ref.read(comparisonProvider.notifier).removeProduct(product.id),
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
            ),
          ),
          Image.network(product.image, height: 100, fit: BoxFit.contain),
          const SizedBox(height: 12),
          Text(
            product.name.toUpperCase(),
            textAlign: TextAlign.center,
            style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 12),
          ),
          const SizedBox(height: 4),
          Text(
            "\$${product.price}",
            style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  Widget _buildAddPlaceholder() {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white10, style: BorderStyle.solid),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(LucideIcons.plus, color: Colors.white38),
            const SizedBox(height: 8),
            const Text("ADD DEVICE", style: TextStyle(color: Colors.white38, fontSize: 10, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildComparisonTable(List<Product> products) {
    final specsKeys = ["Display", "Processor", "Battery", "Main Camera"];
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text("TECHNICAL SPECS", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1, fontSize: 12)),
        const SizedBox(height: 24),
        ...specsKeys.map((key) => _buildSpecRow(key, products)),
      ],
    );
  }

  Widget _buildSpecRow(String key, List<Product> products) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(key.toUpperCase(), style: const TextStyle(color: Colors.white38, fontSize: 10, fontWeight: FontWeight.bold)),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: Text(
                  products[0].specs[key] ?? "-",
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  products.length > 1 ? products[1].specs[key] ?? "-" : "-",
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(color: Colors.white10),
        ],
      ),
    );
  }
}
