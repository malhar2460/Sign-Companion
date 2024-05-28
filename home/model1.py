# # # import tensorflow as tf
# # # from tensorflow.keras import layers
# # #
# # # # Set the path to your dataset folders
# # # train_data_dir      = "C:/Users/MALHAR/Desktop/Python/facerecognition/img"
# # # validation_data_dir = "C:/Users/MALHAR/Desktop/Python/facerecognition/vali"
# # #
# # # # Set the number of classes (letters)
# # # num_classes = 5
# # #
# # # # Set the input image size
# # # image_size = (224, 224)
# # #
# # # # Set the batch size
# # # batch_size = 32
# # #
# # # # Data augmentation and normalization for training
# # # train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
# # #     rescale=1./255,
# # #     shear_range=0.2,
# # #     zoom_range=0.2,
# # #     horizontal_flip=True
# # # )
# # #
# # # # Data normalization for validation
# # # validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)
# # #
# # # # Load and prepare the training data
# # # train_generator = train_datagen.flow_from_directory(
# # #     train_data_dir,
# # #     target_size=image_size,
# # #     batch_size=batch_size,
# # #     class_mode='categorical'
# # # )
# # #
# # # # Load and prepare the validation data
# # # validation_generator = validation_datagen.flow_from_directory(
# # #     validation_data_dir,
# # #     target_size=image_size,
# # #     batch_size=batch_size,
# # #     class_mode='categorical'
# # # )
# # #
# # # # Build the deep learning model
# # # model = tf.keras.Sequential([
# # #     layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Conv2D(64, (3, 3), activation='relu'),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Conv2D(128, (3, 3), activation='relu'),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Flatten(),
# # #     layers.Dense(128, activation='relu'),
# # #     layers.Dense(num_classes, activation='softmax')
# # # ])
# # #
# # # # Compile the model
# # # model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# # #
# # # # Train the model
# # # model.fit(
# # #     train_generator,
# # #     steps_per_epoch=train_generator.samples // batch_size,
# # #     epochs=10,
# # #     validation_data=validation_generator,
# # #     validation_steps=validation_generator.samples // batch_size
# # # )
# # #
# # # # Save the trained model
# # # model.save('model.h5')

# # import tensorflow as tf
# # from tensorflow.keras import layers

# # # Set the path to your dataset folders
# # train_data_dir = "D:/Desktop/Python/facerecognition/train"
# # test_data_dir = "D:/Desktop/Python/facerecognition/test"

# # # Set the number of classes (letters)
# # num_classes = 26

# # # Set the input image size
# # image_size = (224, 224)

# # # Set the batch size
# # batch_size = 35

# # # Data augmentation and normalization for training
# # train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
# #     rescale=1./255,
# #     shear_range=0.2,
# #     zoom_range=0.2,
# #     horizontal_flip=True
# # )

# # # Data normalization for testing
# # test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

# # # Load and prepare the training data
# # train_generator = train_datagen.flow_from_directory(
# #     train_data_dir,
# #     target_size=image_size,
# #     batch_size=batch_size,
# #     class_mode='categorical'
# # )

# # # Load and prepare the testing data
# # test_generator = test_datagen.flow_from_directory(
# #     test_data_dir,
# #     target_size=image_size,
# #     batch_size=batch_size,
# #     class_mode='categorical'
# # )

# # # Build the deep learning model
# # # model = tf.keras.Sequential([
# # #     layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Conv2D(64, (3, 3), activation='relu'),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Conv2D(128, (3, 3), activation='relu'),
# # #     layers.MaxPooling2D((2, 2)),
# # #     layers.Flatten(),
# # #     layers.Dense(128, activation='relu'),
# # #     layers.Dense(num_classes, activation='softmax')
# # # ])

# # model = tf.keras.Sequential([
# #     tf.keras.layers.Conv2D(32, (3, 3), input_shape=(image_size[0], image_size[1], 3)),
# #     tf.keras.layers.Activation('relu'),
# #     tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
# #     tf.keras.layers.Conv2D(32, (3, 3)),
# #     tf.keras.layers.Activation('relu'),
# #     tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
# #     tf.keras.layers.Conv2D(32, (3, 3)),
# #     tf.keras.layers.Activation('relu'),
# #     tf.keras.layers.Dropout(0.5),
# #     tf.keras.layers.Flatten(),
# #     tf.keras.layers.Dense(128),
# #     tf.keras.layers.Dropout(0.5),
# #     tf.keras.layers.Dense(num_classes),
# #     tf.keras.layers.Activation('softmax')
# # ])

# # # Compile the model
# # model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])


# # # Train the model
# # history = model.fit(
# #     train_generator,
# #     steps_per_epoch=train_generator.samples // batch_size,
# #     epochs=30,
# #     validation_split=0.2,
# #     validation_data=test_generator,
# #     validation_steps=test_generator.samples // batch_size,
# # )
# # print(history.history.keys())
# # # Output: dict_keys(['loss', 'accuracy', 'val_loss', 'val_accuracy'])

# # # Plot training and validation loss
# # import matplotlib.pyplot as plt

# # plt.plot(history.history['loss'], label='Train Loss')
# # plt.plot(history.history['val_loss'], label='Validation Loss')
# # plt.title('Training and Validation Loss')
# # plt.xlabel('Epochs')
# # plt.ylabel('Loss')
# # plt.legend()
# # plt.show()

# # # Plot training and validation accuracy
# # plt.plot(history.history['accuracy'], label='Train Accuracy')
# # plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
# # plt.title('Training and Validation Accuracy')
# # plt.xlabel('Epochs')
# # plt.ylabel('Accuracy')
# # plt.legend()
# # plt.show()
# # scores = model.evaluate(test_generator)
# # print("%s: %.2f%%" % ("Evaluate Test Accuracy", scores[1]*100))

# # # Save the trained model
# # model.save('model.h5')

# #NEW MODEL
# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization, Dropout
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras.callbacks import EarlyStopping

# # Set the path to your dataset folders
# train_data_dir = "D:/Desktop/Python/facerecognition/train"
# test_data_dir = "D:/Desktop/Python/facerecognition/test"


# # Set the number of classes (letters)
# num_classes = 26

# # Set the input image size
# image_size = (224, 224)

# # Set the batch size
# batch_size = 64

# # Data augmentation and normalization for training
# train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
#     rescale=1./255,
#     shear_range=0.2,
#     zoom_range=0.2,
#     horizontal_flip=True
# )

# # Data normalization for testing
# test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

# # Load and prepare the training data
# train_generator = train_datagen.flow_from_directory(
#     train_data_dir,
#     target_size=image_size,
#     batch_size=batch_size,
#     class_mode='sparse'  # Use 'sparse' for integer labels
# )

# # Load and prepare the testing data
# test_generator = test_datagen.flow_from_directory(
#     test_data_dir,
#     target_size=image_size,
#     batch_size=batch_size,
#     class_mode='sparse'  # Use 'sparse' for integer labels
# )

# callback = EarlyStopping(
#     monitor='val_loss',
#     min_delta=0.00001,
#     patience=20,
#     verbose=1,
#     mode='auto',
#     restore_best_weights=True,
# )

# # Build the CNN model
# model = Sequential([
#     Conv2D(32, (3, 3),padding='valid', activation='relu', input_shape=(image_size[0], image_size[1], 3)),
#     BatchNormalization(),
#     MaxPooling2D((2, 2),strides=2,padding='valid'),

#     Conv2D(64, (3, 3), activation='relu',padding='valid'),
#     BatchNormalization(),
#     MaxPooling2D((2, 2),strides=2,padding='valid'),

#     Conv2D(128, (3, 3), activation='relu',padding='valid'),
#     BatchNormalization(),
#     MaxPooling2D((2, 2),strides=2,padding='valid'),

#     Flatten(),

#     Dense(128, activation='relu'),
#     Dropout(0.2),
#     Dense(64, activation='relu'),
#     Dropout(0.2),
#     Dense(num_classes, activation='softmax')  # Use num_classes directly
# ])

# # Compile the model with sparse_categorical_crossentropy
# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# # Train the model
# model.summary()

# history = model.fit(
#     train_generator,
#     steps_per_epoch=train_generator.samples // batch_size,
#     epochs=3,
#     validation_split=0.2,
#     validation_data=test_generator,
#     validation_steps=test_generator.samples // batch_size,
#     callbacks=[callback],
# )

# # Evaluate the model on the test set
# eval_result = model.evaluate(test_generator)
# print("Test Loss:", eval_result[0])
# print("Test Accuracy:", eval_result[1])
# # model.summary()
# import matplotlib.pyplot as plt

# plt.plot(history.history['loss'], label='Train Loss')
# plt.plot(history.history['val_loss'], label='Validation Loss')
# plt.title('Training and Validation Loss')
# plt.xlabel('Epochs')
# plt.ylabel('Loss')
# plt.legend()
# plt.show()

# # Plot training and validation accuracy
# plt.plot(history.history['accuracy'], label='Train Accuracy')
# plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
# plt.title('Training and Validation Accuracy')
# plt.xlabel('Epochs')
# plt.ylabel('Accuracy')
# plt.legend()
# plt.show()
# scores = model.evaluate(test_generator)
# print("%s: %.2f%%" % ("Evaluate Test Accuracy", scores[1]*100))

# # Save the trained model
# model.save('model.h5')
# model.summary()


#WORKING MODEL  
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, BatchNormalization, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, TensorBoard, ModelCheckpoint
from tensorflow.keras.initializers import GlorotNormal
from tensorflow.keras.regularizers import l2
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import numpy as np
from tensorflow.keras.utils import plot_model

# Set the path to your dataset folders
train_data_dir = "D:/Desktop/Python/facerecognition/train"
test_data_dir = "D:/Desktop/Python/facerecognition/test"
# train_data_dir = "D:/Desktop/Python/facerecognition/content/new_data/train"
# test_data_dir = "D:/Desktop/Python/facerecognition/content/new_data/val"


# Set the number of classes (letters)
num_classes = 26

# Set the input image size
image_size = (224, 224)

# Set the batch size
batch_size = 64

# No data augmentation for training
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

# No data augmentation for testing
test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

# Load and prepare the training data without augmentation
train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# Load and prepare the testing data without augmentation
test_generator = test_datagen.flow_from_directory(
    test_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical'
)

# Function to plot images from a generator
def plot_images(generator, num_images=5, title='Images'):
    fig, axes = plt.subplots(2, num_images, figsize=(2 * num_images, 4))
    axes = axes.flatten()

    for i in range(num_images):
        # Get a batch of images and labels
        batch = generator.next()
        images, labels = batch

        # Plot the normal images
        axes[i].imshow(images[0])
        axes[i].axis('off')
        axes[i].set_title(f"Label: {np.argmax(labels[0])}")

        # Plot the augmented images
        axes[i + num_images].imshow(images[1])
        axes[i + num_images].axis('off')
        axes[i + num_images].set_title(f"Label: {np.argmax(labels[1])}")

    fig.suptitle(title)
    plt.show()

# Plot training images
print("Training Images (Normal and Augmented):")
plot_images(train_generator, title='Training Images')

# Plot testing images
print("Testing Images (Normal and Augmented):")
plot_images(test_generator, title='Testing Images')

# Build the CNN model
model = Sequential([
    Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(image_size[0], image_size[1], 3), kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    MaxPooling2D((2, 2), strides=2, padding='same'),

    Conv2D(32, (3, 3), activation='relu', padding='same', kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    MaxPooling2D((2, 2), strides=2, padding='same'),

    Conv2D(32, (3, 3), activation='relu', padding='same', kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    MaxPooling2D((2, 2), strides=2, padding='same'),

    Conv2D(32, (3, 3), activation='relu', padding='same', kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    MaxPooling2D((2, 2), strides=2, padding='same'),

    Flatten(),

    Dense(128, activation='relu', kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    Dropout(0.5),
    Dense(128, activation='relu', kernel_initializer='glorot_normal', kernel_regularizer=l2(0.01)),
    BatchNormalization(),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')  # Change activation to 'softmax'
])

# Set the desired learning rate (e.g., 0.001)
learning_rate = 0.0001
custom_optimizer = Adam(learning_rate=learning_rate)

model.compile(optimizer=custom_optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

# Define the ModelCheckpoint callback
checkpoint_filepath = 'best_weights.h5'
model_checkpoint_callback = ModelCheckpoint(
    filepath=checkpoint_filepath,
    save_weights_only=True,
    monitor='val_accuracy',
    mode='max',
    save_best_only=True)

tensorboard_callback = TensorBoard(log_dir='./logs', histogram_freq=1)
model.summary()

# Save the model architecture to a file
# plot_model(model, to_file='model_plot.png', show_shapes=True, show_layer_names=True)
callback = EarlyStopping(
    monitor='val_accuracy',
    min_delta=0.00001,
    patience=10,
    verbose=1,
    mode='auto',
    restore_best_weights=True,
)

# Train the model with the ModelCheckpoint callback
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=50,
    validation_data=test_generator,
    validation_steps=test_generator.samples // batch_size,
    callbacks=[callback, tensorboard_callback, model_checkpoint_callback]
)

# Load the best weights
model.load_weights(checkpoint_filepath)

model.save('D:/Desktop/Python/facerecognition/backend/home/sign_model_2.h5')
eval_result = model.evaluate(test_generator)
print("Test Loss:", eval_result[0])
print("Test Accuracy:", eval_result[1])
# model.summary()
import matplotlib.pyplot as plt

plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Training and Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

# Plot training and validation accuracy
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Training and Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()
scores = model.evaluate(test_generator)
print("%s: %.2f%%" % ("Evaluate Test Accuracy", scores[1]*100))

