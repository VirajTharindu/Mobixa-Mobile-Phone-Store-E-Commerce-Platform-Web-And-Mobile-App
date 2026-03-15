import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../theme/app_theme.dart';
import '../components/glass_card.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          "USER PROFILE",
          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            _buildProfileHeader(),
            const SizedBox(height: 32),
            _buildSection(context, "ACCOUNT DETAILS", [
              _buildInfoRow(LucideIcons.user, "Full Name", "Alex Rivera"),
              _buildInfoRow(LucideIcons.mail, "Email Address", "alex.rivera@techstore.io"),
              _buildInfoRow(LucideIcons.phone, "Phone Number", "+1 (555) 012-3456"),
            ]),
            const SizedBox(height: 24),
            _buildSection(context, "MEMBERSHIP", [
              _buildInfoRow(LucideIcons.shieldCheck, "Plan Type", "Pro Member", color: AppTheme.primary),
              _buildInfoRow(LucideIcons.calendar, "Renew Date", "Nov 12, 2026"),
            ]),
            const SizedBox(height: 24),
            _buildSection(context, "SECURITY", [
              _buildInfoRow(LucideIcons.lock, "Password", "••••••••••••"),
              _buildInfoRow(LucideIcons.shield, "Two-Factor Auth", "Enabled", color: Color(0xFF10B981)),
            ]),
            const SizedBox(height: 32),
            _buildLogoutButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Column(
      children: [
        Stack(
          alignment: Alignment.bottomRight,
          children: [
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppTheme.primary, width: 2),
                image: const DecorationImage(
                  image: NetworkImage("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: const BoxDecoration(
                color: AppTheme.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(LucideIcons.camera, size: 16, color: Colors.white),
            ),
          ],
        ),
        const SizedBox(height: 16),
        const Text(
          "Alex Rivera",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 4),
        const Text(
          "PRO MEMBER",
          style: TextStyle(
            color: AppTheme.primary,
            fontWeight: FontWeight.bold,
            letterSpacing: 2,
            fontSize: 10,
          ),
        ),
      ],
    );
  }

  Widget _buildSection(BuildContext context, String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            letterSpacing: 1,
            fontSize: 12,
            color: Colors.white38,
          ),
        ),
        const SizedBox(height: 16),
        GlassCard(
          padding: const EdgeInsets.all(8),
          child: Column(
            children: children,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, {Color? color}) {
    return ListTile(
      leading: Icon(icon, color: Colors.white24, size: 20),
      title: Text(label, style: const TextStyle(fontSize: 12, color: Colors.white38)),
      subtitle: Text(
        value,
        style: TextStyle(
          color: color ?? Colors.white,
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
      trailing: const Icon(LucideIcons.chevronRight, size: 16, color: Colors.white12),
    );
  }

  Widget _buildLogoutButton() {
    return TextButton.icon(
      onPressed: () {},
      icon: const Icon(LucideIcons.logOut, size: 18, color: Colors.redAccent),
      label: const Text(
        "LOG OUT",
        style: TextStyle(color: Colors.redAccent, fontWeight: FontWeight.bold, letterSpacing: 1),
      ),
    );
  }
}
