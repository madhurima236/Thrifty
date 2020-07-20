import cv2
import pytesseract
from PIL import Image


def read_image(file) -> str:
    img = cv2.imread(file)

    # Adding custom options
    custom_config = r'--oem 3 --psm 6'
    img_text = pytesseract.image_to_string(img, config=custom_config)
    return img_text





# if __name__ == '__main__':
#     text = read_image(
#         '/Users/madhurima/PycharmProjects/ReceiptManagement/MainReader/Pictures to test/TheCurator-3140.jpg')
#     print(text)
