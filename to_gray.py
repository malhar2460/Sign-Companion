import os
import cv2

def process_images(input_folder, output_folder):
    # Iterate through each class folder (a-z) in the input folder
    for class_folder in os.listdir(input_folder):
        class_input_path = os.path.join(input_folder, class_folder)
        class_output_path = os.path.join(output_folder, class_folder)

        # Create the class output folder if it doesn't exist
        os.makedirs(class_output_path, exist_ok=True)

        # Iterate through each file in the class folder
        for filename in os.listdir(class_input_path):
            # Construct the full path for each file
            input_path = os.path.join(class_input_path, filename)
            output_path = os.path.join(class_output_path, filename)

            # Read the image
            image = cv2.imread(input_path)

            # Convert the image to grayscale
            grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # Save the grayscale image to the output folder
            cv2.imwrite(output_path, grayscale_image)

# Set the path to the input and output folders for train and test
train_input_folder = "D:/Desktop/Python/facerecognition/train"
train_output_folder = "D:/Desktop/Python/facerecognition/train_gray"

# test_input_folder = "D:/Desktop/Python/facerecognition/test"
# test_output_folder = "D:/Desktop/Python/facerecognition/test_gray"

# Process train images
process_images(train_input_folder, train_output_folder)

# Process test images
# process_images(test_input_folder, test_output_folder)

print("Conversion completed.")
