import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../data/mock_data.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';
import '../components/shimmer_image.dart';
import '../providers/app_providers.dart';

class ProductDetailScreen extends ConsumerStatefulWidget {
  final Product product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  ConsumerState<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends ConsumerState<ProductDetailScreen> {
  late String selectedColor;
  late String selectedOption;

  @override
  void initState() {
    super.initState();
    selectedColor = widget.product.colors.first;
    selectedOption = "512GB"; // Default option placeholder
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: GlassCard(
            borderRadius: 12,
            padding: EdgeInsets.zero,
            child: IconButton(
              icon: const Icon(LucideIcons.chevronLeft, color: Colors.white),
              onPressed: () => Navigator.pop(context),
            ),
          ),
        ),
        actions: [
          _buildCompareAction(ref),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: GlassCard(
              borderRadius: 12,
              padding: EdgeInsets.zero,
              child: IconButton(
                icon: const Icon(LucideIcons.share2, color: Colors.white),
                onPressed: () {},
              ),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildProductImage(context),
            _buildProductInfo(context),
          ],
        ),
      ),
      bottomNavigationBar: _buildBottomBar(context, ref),
    );
  }

  Widget _buildCompareAction(WidgetRef ref) {
    final comparisonList = ref.watch(comparisonProvider);
    final isComparing = comparisonList.any((p) => p.id == widget.product.id);

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GlassCard(
        borderRadius: 12,
        padding: EdgeInsets.zero,
        opacity: isComparing ? 0.9 : 0.4,
        child: IconButton(
          icon: Icon(
            LucideIcons.columns, 
            color: isComparing ? AppTheme.primary : Colors.white,
            size: 20,
          ),
          onPressed: () {
            ref.read(comparisonProvider.notifier).toggleProduct(widget.product);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(isComparing ? "Removed from comparison" : "Added to comparison"),
                backgroundColor: AppTheme.primary,
                duration: const Duration(seconds: 1),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildProductImage(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.5,
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            AppTheme.primary.withValues(alpha: 0.1),
            Colors.transparent,
          ],
        ),
      ),
      child: Center(
        child: Hero(
          tag: widget.product.id,
          child: ShimmerImage(imageUrl: widget.product.image, fit: BoxFit.contain, height: 300),
        ),
      ),
    );
  }

  Widget _buildProductInfo(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.product.brand.toUpperCase(),
                style: const TextStyle(
                  color: AppTheme.primary,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
              Row(
                children: [
                  const Icon(LucideIcons.star, size: 16, color: AppTheme.gold),
                  const SizedBox(width: 4),
                  Text(
                    "${widget.product.rating} (${widget.product.reviews} reviews)",
                    style: const TextStyle(fontSize: 12),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            widget.product.name.toUpperCase(),
            style: Theme.of(context).textTheme.displayMedium?.copyWith(fontSize: 32),
          ),
          const SizedBox(height: 24),
          Text(
            widget.product.description,
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 32),
          const Text(
            "CHOOSE COLOR",
            style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1, fontSize: 12),
          ),
          const SizedBox(height: 16),
          _buildColorPicker(),
          const SizedBox(height: 32),
          const Text(
            "SPECIFICATIONS",
            style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1, fontSize: 12),
          ),
          const SizedBox(height: 16),
          _buildSpecsList(),
          const SizedBox(height: 100), // Space for bottom bar
        ],
      ),
    );
  }

  Widget _buildColorPicker() {
    return Row(
      children: widget.product.colors.map((colorStr) {
        final color = Color(int.parse(colorStr.replaceAll('#', '0xFF')));
        final isSelected = selectedColor == colorStr;
        return GestureDetector(
          onTap: () => setState(() => selectedColor = colorStr),
          child: Container(
            margin: const EdgeInsets.only(right: 12),
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
              border: Border.all(
                color: isSelected ? Colors.white : Colors.transparent,
                width: 2,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildSpecsList() {
    return Column(
      children: widget.product.specs.entries.map((entry) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 12.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(entry.key, style: const TextStyle(color: Colors.white38)),
              Text(entry.value, style: const TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildBottomBar(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppTheme.background,
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.05))),
      ),
      child: SafeArea(
        child: Row(
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text("Price", style: TextStyle(color: Colors.white38)),
                Text(
                  "\$${widget.product.price}",
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
                ),
              ],
            ),
            const SizedBox(width: 24),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  ref.read(cartProvider.notifier).addToCart(widget.product, selectedColor, selectedOption);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text("${widget.product.name} added to cart"),
                      backgroundColor: AppTheme.primary,
                      duration: const Duration(seconds: 1),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: const Text(
                  "ADD TO CART",
                  style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 2),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
