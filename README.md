===============================================================
AGRO VISION -- PLANT DISEASE DETECTION MOBILE APPLICATION
================================================================

AI-powered mobile application for detecting plant diseases
in Pepper Bell ,  Potato and Tomato crops using image classification.
Agro Vision enables farmers to quickly identify diseases
using a smartphone camera -- fully offline.

================================================================
TABLE OF CONTENTS
================================================================

1.  Project Description
2.  Getting Started
      - Prerequisites
      - Installation
3.  Usage
4.  Features
5.  System Architecture
6.  Database Structure
7.  Model Training (Optional)
8.  Troubleshooting
9.  Contributing
10. License
11. Acknowledgements

================================================================
1. PROJECT DESCRIPTION
================================================================

Agro Vision is a Flutter-based mobile application that uses
a TensorFlow Lite (TFLite) AI model to detect plant diseases
from leaf images.

The system works entirely offline and provides instant
feedback on plant health.

SUPPORTED PLANTS
----------------
  - Potato
  - Tomato
  - PepperBell

DETECTED CONDITIONS
-------------------
  - Early Blight
  - Late Blight
  - Bacterial spot

THE PROBLEM IT SOLVES
---------------------
Farmers often struggle to identify plant diseases early,
leading to crop loss. Agro Vision provides a fast, accurate,
and portable solution using a mobile device.

WHO USES IT
-----------
  Farmer / User
    Captures or uploads a leaf image and receives instant
    disease detection results.

================================================================
2. GETTING STARTED
================================================================

PREREQUISITES
-------------
Ensure the following are installed:

  - Flutter SDK
  - Dart SDK
  - Android Studio or VS Code
  - Android Emulator or Physical Device
  - Python 3.9+ (for model training only)

Verify Flutter installation:
    flutter doctor

INSTALLATION
------------

Step 1 -- Extract Source Code
  Unzip the Agro Vision project and open a terminal in:

      cd AGRO_VISION

Step 2 -- Install Dependencies

      flutter pub get

Step 3 -- Ensure Model Files Are Present

  Place the following inside the assets folder:

      assets/
      âââ agrovision_model.tflite
      âââ labels.txt

Step 4 -- Configure pubspec.yaml

  Ensure assets are registered:

      assets:
        - assets/plant_model.tflite
        - assets/labels.txt

Step 5 -- Connect Device

  - Connect Android phone via USB
  OR
  - Start an emulator

Step 6 -- Run Application

      flutter run

  The app will build and install on the device.

================================================================
3. USAGE
================================================================

USER WORKFLOW
-------------
1. Launch Agro Vision app
2. Capture an image using the camera OR select from gallery
3. The AI model processes the image
4. The result is displayed:
      - Plant type
      - Disease detected
      - Confidence score 

5. Data is stored locally for future reference

================================================================
4. FEATURES
================================================================

REAL-TIME DISEASE DETECTION
  Uses a TensorFlow Lite model to classify plant diseases
  directly on the device.

OFFLINE FUNCTIONALITY
  No internet connection required.

FAST AND LIGHTWEIGHT
  Optimized MobileNetV2 model ensures quick predictions.

LOCAL DATA STORAGE
  Stores scan history using a local database.

USER-FRIENDLY INTERFACE
  Simple UI for capturing and analyzing plant images.

================================================================
5. SYSTEM ARCHITECTURE
================================================================

  Layer        | Technology
  -------------|----------------------------------------
  Frontend     | Flutter (Dart)
  -------------|----------------------------------------
  AI Model     | TensorFlow Lite (MobileNetV2)
  -------------|----------------------------------------
  Image Proc.  | image package (Flutter)
  -------------|----------------------------------------
  Database     | SQLite (local storage)
  -------------|----------------------------------------
  Platform     | Android

KEY FOLDERS
-----------
  AGRO_VISION/
  âââ lib/                Application source code
  âââ assets/             Model and labels
  âââ android/            Android configuration
  âââ ios/                iOS configuration
  âââ pubspec.yaml        Dependency configuration

================================================================
6. DATABASE STRUCTURE
================================================================

The application uses a local SQLite database to store scan
history.

Example stored data:
  - Image path
  - Prediction result
  - Confidence score
  - Timestamp

This allows users to review previous scans.

================================================================
7. MODEL TRAINING (OPTIONAL)
================================================================

To retrain the AI model:

Step 1 -- Navigate to training directory

Step 2 -- Install dependencies

      pip install tensorflow pillow scipy

Step 3 -- Run training script

      python train.py

Step 4 -- Output files

  - plant_model.h5
  - plant_model.tflite

Replace the model in the assets folder with the new one.

================================================================
8. TROUBLESHOOTING
================================================================

  Problem                    Solution
  -------------------------  ------------------------------
  App not running            Run:
                             flutter clean
                             flutter pub get

  Device not detected        Run:
                             flutter devices

  Model not loading          Check assets path and pubspec.yaml

  Wrong predictions          Ensure:
                             - Image is clear
                             - Correct normalization (pixel/255)

  Build errors               Run:
                             flutter doctor

================================================================
9. CONTRIBUTING
================================================================

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push changes
5. Submit a pull request

================================================================
10. LICENSE
================================================================

Distributed under the MIT License.

================================================================
11. ACKNOWLEDGEMENTS
================================================================

  - TensorFlow Lite        Mobile AI framework
  - Flutter                Mobile development framework
  - MobileNetV2            Image classification model

================================================================
Agro Vision -- Smart Farming Through AI
================================================================