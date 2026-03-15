import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Mobixa Color Palette
  static const Color background = Color(0xFF0F172A); // Deep Navy
  static const Color cardBg = Color(0xFF1E293B);
  static const Color primary = Color(0xFF3B82F6); // Electric Blue
  static const Color accent = Color(0xFF3B82F6);
  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color gold = Color(0xFFD4AF37);

  static const Color glassBg = Color(0xB30F172A); // 0.7 opacity
  static const Color glassBorder = Color(0x1AFFFFFF); // 0.1 opacity

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: background,
    primaryColor: primary,
    colorScheme: const ColorScheme.dark(
      primary: primary,
      secondary: accent,
      onSurface: textPrimary,
      surface: background,
    ),
    textTheme: GoogleFonts.interTextTheme(
      const TextTheme(
        displayLarge: TextStyle(
          fontSize: 72,
          fontWeight: FontWeight.w900,
          letterSpacing: -2.0,
          height: 0.9,
          color: textPrimary,
        ),
        displayMedium: TextStyle(
          fontSize: 48,
          fontWeight: FontWeight.w900,
          letterSpacing: -1.0,
          color: textPrimary,
        ),
        titleLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.w900,
          color: textPrimary,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: textSecondary,
        ),
      ),
    ),
    cardTheme: CardThemeData(
      color: cardBg,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
      ),
      elevation: 0,
    ),
  );
}
