from flask import Flask, render_template, session, redirect, url_for, request
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thomaskey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///product.db'
bootstrap = Bootstrap(app)
db = SQLAlchemy(app)



class SortForm(FlaskForm):
    key = SelectField('Sorting By:', choices=[("AI",'Default'),("AN",'Ascending Order By Name'),("AP",'Ascending Order By Price'),("AE",'Ascending Order By Environment'),("DN",'Descending Order By Name'),("DP",'Descending Order By Price'),("DP" ,'Descending Order By Environment')])
    sumbmit=SubmitField('Change')



class Product(db.Model):
    __tablename__='products'
    id = db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(40))
    description=db.Column(db.String(1000))
    image=db.Column(db.String(100))
    price=db.Column(db.Numeric(7,2))
    environment=db.Column(db.Integer)
    
    def __init__(self,name, description, image, price, environment):
        self.name=name
        self.description=description
        self.image=image
        self.price=price
        self.environment=environment
        
    def __repr__(self):
        return '<Name %r>'%self.name


class BuyForm(FlaskForm):
    Forename=StringField('Forename', validators=[DataRequired(),Length(1,16)])
    Surname=StringField('Surname', validators=[DataRequired(), Length(3,20)])
    CardNumber=IntegerField('Card Number', validators=[DataRequired()])
    SecNumber=IntegerField('Security key', validators=[DataRequired()])
    


@app.route('/',methods=['GET','POST'])
def home(): 
    sortform= SortForm()
    products=Product.query.all()
    if sortform.validate_on_submit():
        if sortform.key.data== "AN":
           products=Product.query.order_by(Product.name).all()
        elif sortform.key.data =="AP":
            products=Product.query.order_by(Product.price).all()
        elif sortform.key.data=="AE":
            products=Product.query.order_by(Product.environment).all()
        elif sortform.key.data=="DN":
            products=Product.query.order_by(Product.name.desc()).all()
        elif sortform.key.data=="DP":
            products=Product.query.order_by(Product.price.desc()).all()
        elif sortform.key.data=="DE":
            products=Product.query.order_by(Product.environment.desc()).all() 
        else:
            products=Product.query.order_by(Product.id).all()
    
    return render_template('home.html',products=products, sortform=sortform)
   



@app.route("/<int:id>")
def product(id):
    result =  Product.query.filter_by(id=id).first()
    return render_template('product.html', result=result)
    

@app.route("/addtocart/<int:id>/<string:destination>")  
def addtocart(id,destination):
    product=Product.query.filter_by(id=id).first()
    a=[[id, product.image,product.name,product.price]]
    if 'cart' in session:
        session['cart']+=(a)
    else:
        session['cart']=[]
        session['cart']+=a
        
    if destination =="home":
        return redirect(url_for('home'))
    elif destination =="product":
        return redirect(url_for("product", id=id))

@app.route('/basket')
def basket():
    if 'cart' in session:
        a=session['cart']
    else:
        a=[]
    Pay =False
    finalprice=0.0
    if len(a)!=[]:
        for num in range(len(a)):
            finalprice=finalprice+float(a[num][3])
    if(finalprice>0):
        Pay=True
    return render_template('basket.html',a=a, finalprice=finalprice, Pay=Pay)
    


@app.route("/remove/<int:id>")
def remove(id):
    Contain=True
    alist=session['cart']
    for item in alist:
        if Contain is True:
            if item[0]==id:
                index = session['cart'].index(item)
                alist.pop(index)
                session['cart']=alist
                Contain=False
    
    return redirect(url_for('basket'))


@app.route("/checkout/<int:finalprice>", methods=["GET", "POST"])
def checkout(finalprice):
    finalprice=finalprice
    Transaction = True
    Appreciate=False
    if request.method=="POST":
        Transaction=False
        session.clear()
        Appreciate=True
        
    return render_template('checkout.html',  finalprice=finalprice, Transaction=Transaction, Appreciate=Appreciate)
        
    





if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)