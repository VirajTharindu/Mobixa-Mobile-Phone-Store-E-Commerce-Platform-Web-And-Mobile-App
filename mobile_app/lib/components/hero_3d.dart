import 'package:flutter/material.dart';
import 'package:o3d/o3d.dart';

class Hero3D extends StatefulWidget {
  final String? modelUrl;

  const Hero3D({super.key, this.modelUrl});

  @override
  State<Hero3D> createState() => _Hero3DState();
}

class _Hero3DState extends State<Hero3D> {
  O3DController controller = O3DController();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 450,
      width: double.infinity,
      color: Colors.transparent,
      child: O3D(
        src: 'https://raw.githubusercontent.com/pmndrs/drei-assets/master/iphone.glb',
        controller: controller,
        autoPlay: true,
        autoRotate: true,
        cameraControls: true, 
        backgroundColor: Colors.transparent,
        cameraOrbit: CameraOrbit(0, 90, 8), 
        cameraTarget: CameraTarget(0, 0, 0),
        loading: Loading.eager,
        scale: '0.5 0.5 0.5',
        fieldOfView: '30deg',
        debugLogging: false,
      ),
    );
  }
}
