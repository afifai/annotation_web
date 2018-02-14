
import os
from flask import Flask, redirect, url_for, request, render_template, send_from_directory, session, flash
from werkzeug import secure_filename
from dbconnect import connection
from passlib.hash import sha256_crypt
from functools import wraps
from datetime import datetime
#from sample import *

def generate_filename():
    return str(datetime.now()).replace('-','').replace(' ','').replace(':','').replace('.','')

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args,**kwargs)
        else:
            flash("Anda harus login terlebih dahulu")
            return redirect(url_for('login_page'))
    return wrap

# is file allowed to be uploaded?
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def allowed_label(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_LABEL']

# todo: more pretty interface

# folder to upload pictures
UPLOAD_FOLDER = './uploads/'
LABEL_FOLDER = './label/'
# what files can upload
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
ALLOWED_LABEL = set(['xml'])
# start + config
app = Flask(__name__)
app.secret_key = 'some_secret'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS']=ALLOWED_EXTENSIONS
app.config['LABEL_FOLDER'] = LABEL_FOLDER
app.config['ALLOWED_LABEL']=ALLOWED_LABEL


@app.route('/logout/')
@login_required
def logout():
    session.clear()
    flash("Anda telah keluar")
    return redirect(url_for("login_page"))

@app.route('/login/', methods=['GET','POST'])
def login_page():
    error = ''
    try:
        
        if request.method == "POST":
            c, conn = connection()
            statement = "SELECT * FROM users WHERE email LIKE "+"'"+str(request.form['email'])+"';"
            line = (str(request.form['email']),)
            c.execute(statement,line)
            data = c.fetchone()
            if sha256_crypt.verify(request.form['password'],data[5]):
                session['logged_in'] = True
                session['name'] = data[1]
                session['user_id'] = data[0]
                #flash("Anda telah login")
                c.close()
                conn.close()
                return redirect(url_for("dashboard"))
            else:
                error = "Username / password salah, silahkan coba lagi"

        return render_template("login.html", error = error)
    
    except Exception as e:
        error = "Username / password salah, silahkan coba lagi"
        return render_template("login.html", error = error)

@app.route('/register/', methods=['GET','POST'])
def register_page():
    try:
        if request.method == "POST":
            try:
                nama = request.form['name']
                email = request.form['email']
                hp = request.form['hp']
                gender = request.form['gender']
                password = str(request.form['password'])
                confirm = str(request.form['confirm-password'])
                if password != confirm:
                    return render_template("register.html",error='Password tidak sama, silahkan ulangi')
                password = sha256_crypt.encrypt(password)
                c, conn = connection()
                statement = "SELECT id FROM users WHERE email LIKE %s"
                line = (email,)
                c.execute(statement, line)
                x = c.fetchall()
                if len(x) > 0:
                    c.close()
                    conn.close()
                    return render_template("register.html", error = 'Email anda sudah terdaftar, silahkan login')
                statement = "INSERT INTO users(nama,email,telepon,gender,password) VALUES(%s, %s, %s, %s, %s)"
                line = (nama, email, hp, gender, password)
                c.execute(statement, line)
                conn.commit()
                c.close()
                conn.close()
                flash("Terima kasih telah mendaftar, silahkan login")
                return redirect(url_for("login_page"))
            except Exception as e:
                return render_template("register.html",error=str(e))
        return render_template("register.html")
    except Exception as e:
        return render_template("register.html",error=str(e))

@app.route('/')
@login_required
def dashboard():
    return render_template('petunjuk.html', nama=session['name'])

@app.route('/anotasi/')
@login_required
def anotasi_page():
    c, conn = connection()
    statement = "SELECT id FROM data WHERE user_id = %s"
    line = (session['user_id'],)
    c.execute(statement,line)
    x = c.fetchall()
    c.close()
    conn.close()
    error = ''
    return render_template('anotasi.html', nama=session['name'],jum = len(x))

@app.route('/anotasi/upload', methods=['POST'])
@login_required
def upload_annotation():
    # Get the name of the uploaded file
    file = request.files['file']
    label = request.files['label']
    caption = request.form['caption']
    if file.filename.split('.')[-1] not in ['jpg','jpeg','png']:
        flash('Format file tidak didukung, pastikan file berformat: jpg,jpeg atau png')
        return redirect(url_for('anotasi_page'))
    if label.filename.split('.')[-1] != 'xml':
        flash('Format file tidak didukung, pastikan label berformat: xml')
        return redirect(url_for('anotasi_page'))
    # Check if the file is one of the allowed types/extensions

    if file and allowed_file(file.filename) and label and allowed_label(label.filename):
        # remove unsupported chars etc
        filename = secure_filename(file.filename)
        ext = filename.split('.')[-1]
        filename = generate_filename()+'.'
        #save path
        save_img = os.path.join(app.config['UPLOAD_FOLDER'], filename+ext)
        save_label = os.path.join(app.config['LABEL_FOLDER'], filename+'xml')
        #save file
        file.save(save_img)
        label.save(save_label)

        c, conn = connection()
        statement = "SELECT id FROM data WHERE namafile LIKE %s"
        line = (filename,)
        c.execute(statement, line)
        x = c.fetchall()
        if len(x) > 0:
            c.close()
            conn.close()
            return render_template("thanks.html")

        statement = "INSERT INTO data(namafile, caption, user_id) VALUES (%s, %s, %s)"
        line = (filename, caption, session['user_id'])
        c.execute(statement, line)
        conn.commit()
        c.close()
        conn.close()

        #pass file to model and return bool
        #show if photo is a photo of hotdog
        return render_template('thanks.html')
    #else:
    #    flash('Format file tidak didukung, pastikan file berformat: jpg,jpeg atau png')
    #    return redirect(url_for('anotasi_page'))


@app.route('/image/<path:filename>/')
@login_required
def show_images(filename):
    return send_from_directory(app.config['FEEDBACK'], filename)


@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")
if __name__ == '__main__':
   app.run(debug=True)
