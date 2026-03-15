import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../data/mock_data.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';
import '../components/shimmer_image.dart';
import 'product_detail_screen.dart';

class CategoryScreen extends StatelessWidget {
  final Category category;

  const CategoryScreen({super.key, required this.category});

  @override
  Widget build(BuildContext context) {
    final products = mockProducts.where((p) => p.category == "Smartphones").toList(); // Filtering logic simplified

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          category.name.toUpperCase(),
          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(LucideIcons.chevronLeft),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: Column(
        children: [
          _buildHeroHeader(context),
          Expanded(child: _buildProductGrid(context, products)),
        ],
      ),
    );
  }

  Widget _buildHeroHeader(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppTheme.primary.withValues(alpha: 0.05),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            category.description.toUpperCase(),
            style: const TextStyle(color: AppTheme.primary, letterSpacing: 2, fontWeight: FontWeight.bold, fontSize: 10),
          ),
          const SizedBox(height: 8),
          Text(
            "CHOOSE YOUR\n${category.name.toUpperCase()}",
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, height: 1.1),
          ),
        ],
      ),
    );
  }

  Widget _buildProductGrid(BuildContext context, List<Product> products) {
    return GridView.builder(
      padding: const EdgeInsets.all(24),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        childAspectRatio: 0.7,
      ),
      itemCount: products.length,
      itemBuilder: (context, index) {
        final product = products[index];
        return GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => ProductDetailScreen(product: product)),
            );
          },
          child: GlassCard(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Center(
                    child: Hero(
                      tag: product.id,
                      child: ShimmerImage(imageUrl: product.image, fit: BoxFit.contain),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Text(
                  product.brand.toUpperCase(),
                  style: const TextStyle(fontSize: 10, letterSpacing: 1, color: Colors.white38),
                ),
                const SizedBox(height: 4),
                Text(
                  product.name.toUpperCase(),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                ),
                const Spacer(),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "\$${product.price}",
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                    ),
                    const Icon(LucideIcons.arrowRight, size: 16, color: AppTheme.primary),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
