import tkinter as tk

root = tk.Tk()
root.title("Документація")
root.geometry("600x400")

# Створюємо текстовий віджет
text = tk.Text(root, wrap="word", font=("Arial", 12))
text.pack(expand=True, fill="both", padx=10, pady=10)

# Вставляємо текст документації
documentation = """
Вивід графічних об'єктів

scene(width, height, color);

x - вісь x, 
y - вісь y,
color - колір

rect(x, y, width, height, color);

x - вісь x, 
y - вісь y,
width - ширина,
height - висота,
color - колір

circle(x, y, radius, color);
x - вісь x, 
y - вісь y,
radius - радіус,
color - колір

text(x, y, str, fontFamily, fontSize, color);
x - вісь x, 
y - вісь y,
str - текст, що ми хочемо вивести,
fontFamily - шрифт,
fontSize - розмір шрифту,
color - колір.

Автор: Vovarbty
"""

text.insert("1.0", documentation)
text.config(state="disabled")  # Заборонити редагування

# Запускаємо головний цикл
root.mainloop()