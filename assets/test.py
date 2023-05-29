import cv2 as cv

face_data = cv.CascadeClassifier(
    "C:\\Users\\reday\\Documents\\Drone-Project\\assets\\haarcascade_frontalface_default.xml"
)
eye_data = cv.CascadeClassifier(
    "C:\\Users\\reday\\Documents\\Drone-Project\\assets\\haarcascade_eye.xml"
)

image = cv.imread("C:\\Users\\reday\\Documents\\Drone-Project\\assets\\newface.jpg")

gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
face = face_data.detectMultiScale(gray, 1.3, 5)
print(len(face))

for x, y, w, h in face:
    cv.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
    eye_gray = gray[y : y + h, x : x + w]
    eye_color = image[y : y + h, x : x + w]
    eyes = eye_data.detectMultiScale(eye_gray)
    for ex, ey, ew, eh in eyes:
        cv.rectangle(eye_color, (ex, ey), (ey + ew, ey + eh), (0, 255, 0), 2)

cv.imshow("image", image)
cv.waitKey(0)

cv.destroyAllWindows()
