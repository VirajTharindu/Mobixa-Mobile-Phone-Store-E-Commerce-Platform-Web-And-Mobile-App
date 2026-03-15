import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:google_fonts/google_fonts.dart';
import '../components/glass_card.dart';
import '../components/hero_3d.dart';
import '../components/shimmer_image.dart';
import '../theme/app_theme.dart';
import '../data/mock_data.dart';
import 'category_screen.dart';
import 'product_detail_screen.dart';
import 'cart_screen.dart';
import 'orders_screen.dart';
import 'compare_screen.dart';
import 'profile_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text(
          "MOBIXA",
          style: GoogleFonts.inter(fontWeight: FontWeight.w900, letterSpacing: 2, fontSize: 16),
        ),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.columns),
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const CompareScreen())),
          ),
          IconButton(
            icon: const Icon(LucideIcons.shoppingCart),
            onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const CartScreen())),
          ),
        ],
      ),
      drawer: _buildDrawer(context),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHero(context),
            _buildBentoGrid(context),
            _buildCollections(context),
            _buildNewArrivals(context),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      backgroundColor: AppTheme.background,
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(32.0),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(8)),
                    child: const Icon(LucideIcons.settings, color: Colors.white, size: 20),
                  ),
                  const SizedBox(width: 12),
                  const Text("MOBIXA", style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1)),
                ],
              ),
            ),
            _buildDrawerItem(context, "Store", LucideIcons.home, () => Navigator.pop(context)),
            _buildDrawerItem(context, "User Profile", LucideIcons.user, () {
              Navigator.pop(context);
              Navigator.push(context, MaterialPageRoute(builder: (context) => const ProfileScreen()));
            }),
            _buildDrawerItem(context, "My Orders", LucideIcons.package, () {
              Navigator.pop(context);
              Navigator.push(context, MaterialPageRoute(builder: (context) => const OrdersScreen()));
            }),
            _buildDrawerItem(context, "Compare", LucideIcons.columns, () {
              Navigator.pop(context);
              Navigator.push(context, MaterialPageRoute(builder: (context) => const CompareScreen()));
            }),
            const Spacer(),
            _buildDrawerItem(context, "Settings", LucideIcons.settings, () {}),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem(BuildContext context, String title, IconData icon, VoidCallback onTap) {
    return ListTile(
      leading: Icon(icon, color: Colors.white38, size: 20),
      title: Text(title, style: const TextStyle(color: Colors.white70, fontWeight: FontWeight.bold, fontSize: 14)),
      onTap: onTap,
    );
  }

  Widget _buildHero(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(top: 100), // Added padding for transparent app bar
      height: MediaQuery.of(context).size.height * 0.9,
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: RadialGradient(
          center: Alignment.center,
          radius: 1.0,
          colors: [
            AppTheme.primary.withValues(alpha: 0.1),
            Colors.transparent,
          ],
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            top: 100,
            left: 24,
            right: 24,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildBadge(),
                const SizedBox(height: 24),
                Text(
                  "BEYOND\nREALITY",
                  style: Theme.of(context).textTheme.displayLarge?.copyWith(
                    fontStyle: FontStyle.italic,
                  ),
                ).animate().fadeIn(duration: 800.ms).slideY(begin: 0.2, end: 0),
                const SizedBox(height: 24),
                Text(
                  "Engineered with Aerospace-Grade Titanium and the most powerful AI chip ever in a smartphone.",
                  style: Theme.of(context).textTheme.bodyLarge,
                ).animate().fadeIn(delay: 400.ms, duration: 800.ms),
                const SizedBox(height: 48),
                Wrap(
                  spacing: 16,
                  runSpacing: 16,
                  children: [
                    _buildButton("Experience Now", isPrimary: true),
                    _buildButton("View Tech Specs", isPrimary: false),
                  ],
                ).animate().fadeIn(delay: 600.ms, duration: 800.ms),
                const SizedBox(height: 32),
                // 3D Scene under buttons
                const Hero3D(),
                const SizedBox(height: 64),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge() {
    return GlassCard(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      borderRadius: 100,
      opacity: 0.4,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(LucideIcons.zap, size: 14, color: AppTheme.primary),
          const SizedBox(width: 8),
          Text(
            "NEXT GEN ARRIVES",
            style: GoogleFonts.inter(
              fontSize: 10,
              fontWeight: FontWeight.w900,
              letterSpacing: 3,
            ),
          ),
        ],
      ),
    ).animate().fadeIn(duration: 800.ms).scale(begin: const Offset(0.8, 0.8));
  }

  Widget _buildButton(String text, {required bool isPrimary}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
      decoration: BoxDecoration(
        color: isPrimary ? AppTheme.primary : AppTheme.glassBg,
        borderRadius: BorderRadius.circular(20),
        border: isPrimary ? null : Border.all(color: AppTheme.glassBorder),
        boxShadow: isPrimary ? [
          BoxShadow(
            color: AppTheme.primary.withValues(alpha: 0.4),
            blurRadius: 20,
            offset: const Offset(0, 10),
          )
        ] : null,
      ),
      child: Text(
        text.toUpperCase(),
        style: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w900,
          letterSpacing: 2,
          color: Colors.white,
        ),
      ),
    );
  }


  Widget _buildBentoGrid(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "WHY MOBIXA",
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 32),
          _buildBentoItem(
            context, 
            "Global Logistics", 
            "Next-gen delivery network.", 
            LucideIcons.truck,
            height: 160,
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildBentoItem(
                  context, 
                  "Elite Support", 
                  "24/7 technical concierge", 
                  LucideIcons.headphones,
                  height: 180,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: _buildBentoItem(
                  context, 
                  "Secure Ecosystem", 
                  "Encrypted transactions", 
                  LucideIcons.lock,
                  height: 180,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildBentoItem(BuildContext context, String title, String subtitle, IconData icon, {double? height}) {
    return SizedBox(
      height: height,
      child: GlassCard(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Icon(icon, color: AppTheme.primary, size: 32),
            const SizedBox(height: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title.toUpperCase(),
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(fontSize: 16),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontSize: 11),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCollections(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 48),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "COLLECTIONS",
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text("EXPLORE ALL"),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            height: 350,
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              scrollDirection: Axis.horizontal,
              itemCount: mockCategories.length,
              itemBuilder: (context, index) {
                final cat = mockCategories[index];
                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => CategoryScreen(category: cat),
                      ),
                    );
                  },
                  child: Container(
                    width: 280,
                    margin: const EdgeInsets.only(right: 16),
                    child: GlassCard(
                      padding: EdgeInsets.zero,
                      child: Stack(
                        children: [
                          Positioned.fill(
                            child: Opacity(
                              opacity: 0.4,
                              child: ShimmerImage(imageUrl: cat.image, fit: BoxFit.cover),
                            ),
                          ),
                          Positioned(
                            bottom: 24,
                            left: 24,
                            right: 24,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  cat.description.toUpperCase(),
                                  style: const TextStyle(
                                    color: AppTheme.primary,
                                    fontSize: 8,
                                    fontWeight: FontWeight.w900,
                                    letterSpacing: 2,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  cat.name.toUpperCase(),
                                  style: const TextStyle(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w900,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNewArrivals(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          _buildDivider("NEW IN STOCK"),
          const SizedBox(height: 32),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 0.7,
            ),
            itemCount: mockProducts.length,
            itemBuilder: (context, index) {
              final product = mockProducts[index];
              return GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProductDetailScreen(product: product),
                    ),
                  );
                },
                child: GlassCard(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.05),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Center(
                              child: Hero(
                                tag: product.id,
                                child: ShimmerImage(imageUrl: product.image, fit: BoxFit.contain),
                              ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        product.brand.toUpperCase(),
                        style: const TextStyle(fontSize: 10, letterSpacing: 1),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        product.name.toUpperCase(),
                        style: const TextStyle(fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "\$${product.price}",
                            style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
                          ),
                          GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const CartScreen()),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: AppTheme.primary,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Icon(LucideIcons.shoppingCart, size: 16),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildDivider(String text) {
    return Row(
      children: [
        const Expanded(child: Divider(color: Colors.white10)),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            text,
            style: const TextStyle(fontSize: 12, letterSpacing: 2, fontWeight: FontWeight.bold),
          ),
        ),
        const Expanded(child: Divider(color: Colors.white10)),
      ],
    );
  }
}
