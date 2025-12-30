# 🎨 AI Virtual Painter

A touch-free digital canvas that allows you to draw in the air using hand gestures! Built with **OpenCV** and **MediaPipe**, this application tracks your index finger to draw and uses gesture recognition for tool selection.

![OpenCV](https://img.shields.io/badge/OpenCV-5.0-red) ![MediaPipe](https://img.shields.io/badge/MediaPipe-Latest-blue) ![Python](https://img.shields.io/badge/Python-3.x-yellow)

## 🚀 Features

*   **Hand Gestures Control**:
    *   **Draw Mode**: Point with your index finger (Index up, Middle down).
    *   **Selection Mode**: Hover to select colors or tools (Index & Middle fingers up).
*   **Dynamic Tool Menu**:
    *   **Colors**: 🟣 Purple, 🔵 Blue, 🟢 Green.
    *   **Eraser**: 🧹 Select the Black color to use as an eraser.
    *   **Brush Sizes**: Choose from 3 different brush thicknesses.
*   **Canvas Controls**:
    *   **Undo/Redo**: Correct mistakes easily.
    *   **Save Work**: Save your masterpieces to the `saved_drawings/` folder.
    *   **Auto-Save**: Background thread automatically saves your work every 30 seconds.
    *   **Clear Canvas**: Wipe the slate clean instantly.
    *   **Backgrounds**: Option to toggle a background image.

## 🛠️ Tech Stack

*   **[Python](https://www.python.org/)**: Core logic and scripting.
*   **[OpenCV (cv2)](https://opencv.org/)**: Real-time computer vision, image processing, and drawing.
*   **[MediaPipe](https://developers.google.com/mediapipe)**: robust hand tracking and landmark detection.
*   **Numpy**: Efficient array manipulation for the canvas.

## 📋 Prerequisites

Ensure you have Python installed. You will need the following dependencies:

```bash
pip install opencv-python numpy mediapipe
```

## 🎮 How to Use

1.  **Clone the Repository** and navigate to the project folder.
2.  **Run the Application**:
    ```bash
    python main.py
    ```
3.  **Controls**:

    | Key Action | Description |
    | :--- | :--- |
    | **`s`** | Save current drawing |
    | **`c`** | Clear canvas |
    | **`z`** | Undo last stroke |
    | **`y`** | Redo last undo |
    | **`b`** | Load background image |
    | **`ESC`** | Exit application |

## 🖌️ Interaction Guide

*   **To Draw**: Keep your **Index Finger UP** and other fingers down.
*   **To Select Tool/Color**: Keep **Index & Middle Fingers UP** (like a Peace sign ✌️) and hover over the menu at the top.
*   **To Stop Drawing**: Simply lower your hand or change to selection gesture.

## 📂 Project Structure

```
├── main.py              # Main application script
├── background.JPG       # Background image resource
├── saved_drawings/      # Directory where drawings are saved
└── README.md            # Project documentation
```

---
*Created with ❤️ using Python & OpenCV*
