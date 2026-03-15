import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';
import '../data/mock_data.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "ORDER HISTORY",
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSearchBar(),
            const SizedBox(height: 32),
            _buildStatsCards(context),
            const SizedBox(height: 32),
            const Text(
              "RECENT ORDERS",
              style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1),
            ),
            const SizedBox(height: 24),
            ...mockOrders.map((order) => _buildOrderCard(context, order)),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchBar() {
    return GlassCard(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      borderRadius: 16,
      child: TextField(
        decoration: InputDecoration(
          icon: const Icon(LucideIcons.search, size: 18, color: Colors.white24),
          hintText: "Search orders, serials, or invoices...",
          hintStyle: const TextStyle(color: Colors.white24, fontSize: 13),
          border: InputBorder.none,
        ),
      ),
    );
  }

  Widget _buildStatsCards(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      physics: const BouncingScrollPhysics(),
      child: Row(
        children: [
          _buildStatCard(context, "Total Orders", "24", LucideIcons.package),
          const SizedBox(width: 16),
          _buildStatCard(context, "Active Shipments", "02", LucideIcons.truck),
          const SizedBox(width: 16),
          _buildStatCard(context, "Saved Items", "15", LucideIcons.heart),
        ],
      ),
    );
  }

  Widget _buildStatCard(BuildContext context, String title, String value, IconData icon) {
    return Container(
      constraints: const BoxConstraints(minWidth: 160),
      child: GlassCard(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(title, style: const TextStyle(color: Colors.white38, fontSize: 10)),
                const SizedBox(height: 4),
                Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900)),
              ],
            ),
            const SizedBox(width: 12),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppTheme.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: AppTheme.primary, size: 20),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOrderCard(BuildContext context, Order order) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: GlassCard(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  width: 60,
                  height: 60,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.05),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.all(8),
                  child: Image.network(order.image, fit: BoxFit.contain),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "ORDER ${order.id}",
                        style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        order.product.toUpperCase(),
                        style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  "\$${order.price}",
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildStatusInfo(order),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusInfo(Order order) {
    if (order.status == "Shipped") {
      return Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("STATUS: SHIPPED", style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 10)),
              Text("EST. DELIVERY: ${order.estimatedDelivery}", style: const TextStyle(color: Colors.white38, fontSize: 10)),
            ],
          ),
          const SizedBox(height: 12),
          LinearProgressIndicator(
            value: 0.66,
            backgroundColor: Colors.white10,
            color: AppTheme.primary,
            borderRadius: BorderRadius.circular(2),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text("CONFIRMED", style: TextStyle(color: Colors.white38, fontSize: 8)),
              Text("SHIPPED", style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 8)),
              Text("DELIVERED", style: TextStyle(color: Colors.white38, fontSize: 8)),
            ],
          ),
        ],
      );
    } else {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Icon(LucideIcons.checkCircle, size: 14, color: Color(0xFF10B981)),
              const SizedBox(width: 8),
              Text(
                "DELIVERED ON ${order.deliveredDate}".toUpperCase(),
                style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold, fontSize: 10),
              ),
            ],
          ),
          const Text("DETAILS", style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 10)),
        ],
      );
    }
  }
}
