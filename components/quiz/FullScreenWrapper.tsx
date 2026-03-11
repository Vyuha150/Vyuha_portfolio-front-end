import { useEffect, useState } from "react";

export default function FullScreenWrapper({
  children,
  exitFullScreen,
  quizStarted,
}: {
  children: React.ReactNode;
  exitFullScreen: boolean; // Prop to indicate whether to exit fullscreen
  quizStarted: boolean; // Prop to indicate whether the quiz has started
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullScreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      // Type assertion for Safari
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      // Type assertion for Internet Explorer
      (element as any).msRequestFullscreen();
    }

    setIsFullScreen(true);
  };

  const exitFullScreenMode = () => {
    if (
      document.fullscreenElement || // Standard API
      (document as any).webkitFullscreenElement || // Safari
      (document as any).msFullscreenElement // IE
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        // Type assertion for Safari
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        // Type assertion for Internet Explorer
        (document as any).msExitFullscreen();
      }

      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    if (quizStarted && !isFullScreen) {
      enterFullScreen();
    }

    if (exitFullScreen) {
      exitFullScreenMode();
    }

    return () => {
      if (exitFullScreen) {
        exitFullScreenMode();
      }
    };
  }, [quizStarted, exitFullScreen]);

  return (
    <div className="h-screen w-screen text-white flex items-center justify-center">
      {!quizStarted && !isFullScreen ? (
        <button
          onClick={enterFullScreen}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Enter Fullscreen to Start
        </button>
      ) : (
        children
      )}
    </div>
  );
}
