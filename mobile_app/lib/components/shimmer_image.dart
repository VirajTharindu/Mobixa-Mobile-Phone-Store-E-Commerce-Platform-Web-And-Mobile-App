import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class ShimmerImage extends StatelessWidget {
  final String imageUrl;
  final double? height;
  final BoxFit fit;

  const ShimmerImage({
    super.key,
    required this.imageUrl,
    this.height,
    this.fit = BoxFit.cover,
  });

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Base Image
        Image.network(
          imageUrl,
          height: height,
          fit: fit,
          loadingBuilder: (context, child, loadingProgress) {
            if (loadingProgress == null) return child;
            return Container(
              height: height,
              color: Colors.white.withValues(alpha: 0.05),
            ).animate(onPlay: (controller) => controller.repeat())
             .shimmer(duration: 1000.ms, color: Colors.white10);
          },
        ),
        
        // Shimmer Overlay (Liquid Effect Approximation)
        Positioned.fill(
          child: Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Colors.white.withValues(alpha: 0.0),
                  Colors.white.withValues(alpha: 0.1),
                  Colors.white.withValues(alpha: 0.0),
                ],
                stops: const [0.3, 0.5, 0.7],
              ),
            ),
          ).animate(onPlay: (controller) => controller.repeat())
           .shimmer(duration: 2500.ms, angle: 0.5, color: Colors.white.withValues(alpha: 0.2)),
        ),
      ],
    );
  }
}
