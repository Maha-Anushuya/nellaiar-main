// TypeScript type definitions for model-viewer web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        alt?: string;
        poster?: string;
        'loading'?: 'eager' | 'lazy';
        'reveal'?: 'auto' | 'interaction' | 'manual';
        'ar'?: boolean | string;
        'ar-modes'?: string;
        'ar-scale'?: 'fixed' | 'auto';
        'ar-placement'?: 'floor' | 'wall';
        'camera-controls'?: boolean | string;
        'auto-rotate'?: boolean | string;
        'auto-rotate-delay'?: number;
        'rotation-per-second'?: number;
        'interaction-prompt'?: 'auto' | 'none';
        'interaction-prompt-threshold'?: number;
        'shadow-intensity'?: number;
        'shadow-softness'?: number;
        'environment-image'?: string;
        'exposure'?: number;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'field-of-view'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'min-field-of-view'?: string;
        'max-field-of-view'?: string;
        'min-camera-target'?: string;
        'max-camera-target'?: string;
        'zoom'?: boolean | string;
        'zoom-speed'?: number;
        'pan'?: boolean | string;
        'touch-action'?: string;
        'dismiss'?: boolean | string;
        'debug'?: boolean | string;
      };
    }
  }
}

interface ModelViewerProps {
  src: string;
  alt?: string;
  poster?: string;
  loading?: 'eager' | 'lazy';
  reveal?: 'auto' | 'interaction' | 'manual';
  ar?: boolean;
  arModes?: string;
  arScale?: 'fixed' | 'auto';
  arPlacement?: 'floor' | 'wall';
  cameraControls?: boolean;
  autoRotate?: boolean;
  autoRotateDelay?: number;
  rotationPerSecond?: number;
  interactionPrompt?: 'auto' | 'none';
  interactionPromptThreshold?: number;
  shadowIntensity?: number;
  shadowSoftness?: number;
  environmentImage?: string;
  exposure?: number;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
  minFieldOfView?: string;
  maxFieldOfView?: string;
  zoom?: boolean;
  zoomSpeed?: number;
  pan?: boolean;
  touchAction?: string;
  dismiss?: boolean;
  debug?: boolean;
  style?: React.CSSProperties;
}

export default function ModelViewer({
  src,
  alt,
  poster,
  loading = 'lazy',
  reveal = 'auto',
  ar = false,
  arModes = 'webxr scene-viewer quick-look',
  arScale = 'auto',
  arPlacement = 'floor',
  cameraControls = true,
  autoRotate = true,
  autoRotateDelay = 0,
  rotationPerSecond = 30,
  interactionPrompt = 'auto',
  interactionPromptThreshold = 300,
  shadowIntensity = 0,
  shadowSoftness = 0,
  environmentImage,
  exposure = 1,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
  minCameraOrbit,
  maxCameraOrbit,
  minFieldOfView,
  maxFieldOfView,
  zoom = true,
  zoomSpeed = 1,
  pan = true,
  touchAction = 'pan-y',
  dismiss = true,
  debug = false,
  style = { width: "100%", height: "400px" }
}: ModelViewerProps) {
  return (
    <model-viewer
      src={src}
      alt={alt}
      poster={poster}
      loading={loading}
      reveal={reveal}
      ar={ar ? '' : undefined}
      ar-modes={arModes}
      ar-scale={arScale}
      ar-placement={arPlacement}
      camera-controls={cameraControls ? '' : undefined}
      auto-rotate={autoRotate ? '' : undefined}
      auto-rotate-delay={autoRotateDelay}
      rotation-per-second={rotationPerSecond}
      interaction-prompt={interactionPrompt}
      interaction-prompt-threshold={interactionPromptThreshold}
      shadow-intensity={shadowIntensity}
      shadow-softness={shadowSoftness}
      environment-image={environmentImage}
      exposure={exposure}
      camera-orbit={cameraOrbit}
      camera-target={cameraTarget}
      field-of-view={fieldOfView}
      min-camera-orbit={minCameraOrbit}
      max-camera-orbit={maxCameraOrbit}
      min-field-of-view={minFieldOfView}
      max-field-of-view={maxFieldOfView}
      zoom={zoom ? '' : undefined}
      zoom-speed={zoomSpeed}
      pan={pan ? '' : undefined}
      touch-action={touchAction}
      dismiss={dismiss ? '' : undefined}
      debug={debug ? '' : undefined}
      style={style}
    />
  );
}
