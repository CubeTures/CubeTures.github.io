from tkinter import *
from tkinter import messagebox
# 6 tall, 7 wide

root = Tk()
root.title("Connect 4")

debug = False
red =  True
count = 0

def disbable_all_buttons():
    for r in board:
        for button in r:
            button.config(state = DISABLED)

def has_won(color):
    disbable_all_buttons()
    messagebox.showinfo('Tic Tac Toe', color + " Wins!")

def check_win():
    win = False

    # Column
    for r in board:
        for x in range(4):
            if r[0 + x]['bg'] != 'SystemButtonFace' and r[0 + x]['bg'] == r[1 + x]['bg'] == r[2 + x]['bg'] == r[3 + x]['bg']:
                win = True
                has_won(r[0 + x]['bg'])

    # Row
    for r in range(3):
        for c in range(7):
            if board[0 + r][c]['bg'] != 'SystemButtonFace' and board[0 + r][c]['bg'] == board[1 + r][c]['bg'] == board[2 + r][c]['bg'] == board[3 + r][c]['bg']:
                win = True
                has_won(board[r][0 + c]['bg'])

    # LR Diag
    for r in range(3):
        for c in range(4):
            if board[r][c]['bg'] != 'SystemButtonFace' and board[r][c]['bg'] == board[1 + r][1 + c]['bg'] == board[2 + r][2 + c]['bg'] == board[3 + r][3 + c]['bg']:
                win = True
                has_won(board[r][c]['bg'])

    # RL Diag
    for r in range(3):
        for c in range(4):
            if board[3 + r][c]['bg'] != 'SystemButtonFace' and board[3 + r][0 + c]['bg'] == board[2 + r][1 + c]['bg'] == board[1 + r][2 + c]['bg'] == board[0 + r][3 + c]['bg']:
                win = True
                has_won(board[3 + r][c]['bg'])

    if count >= 42 and not win:
        messagebox.showinfo("Tic Tac Toe", "Tie")
        disbable_all_buttons()


def b_click(button):
    global count
    count += 1

    global red

    column = -1
    for r in range(len(board)):
            if button in board[r]:
                column = board[r].index(button)

    placed = False
    for r in range(len(board)):
        if not placed and board[len(board) - r - 1][column]['bg'] == 'SystemButtonFace':
            board[len(board) - r - 1][column].config(bg = 'red' if red else 'yellow')
            placed = True
            red = not red

    if not placed:
        messagebox.showerror('Tic Tac Toe', 'This column is already full.')

    check_win()



    if debug:
        for r in range(len(board)):
            if button in board[r]:
                button['text'] = str(r) + ' ' + str(board[r].index(button))

def new_button():
    button = Button(root, text = " ", font = ("Helvetica, 20"),
    height = 3, width = 6, bg = "SystemButtonFace", command = lambda: b_click(button))
    return button

# y and x positions are reversed!!!
def reset():
    global count
    count = 0

    global red
    red =  True

    global board
    board = [[new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],
             [new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],
             [new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],
             [new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],
             [new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],
             [new_button(), new_button(), new_button(), new_button(), new_button(), new_button(), new_button()],]

    for r in range(len(board)):
        for c in range(len(board[r])):
            board[r][c].grid(row = r, column = c)

my_menu = Menu(root)
root.config(menu = my_menu)
options_menu = Menu(my_menu, tearoff = False)
my_menu.add_cascade(label = 'Options', menu = options_menu)
options_menu.add_command(label = 'Reset Game', command = lambda: reset())

reset()
root.mainloop()