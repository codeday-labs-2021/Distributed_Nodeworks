from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField
from wtforms.validators import DataRequired,Length,Email

class RegistrationForm(FlaskForm):
    username = StringField('Username',validators=[DataRequired(),Length(min = 1, max = 20)])
    email = StringField('Email', validators=[DataRequired(),Email()])
    password = PasswordField('Password',validators=[DataRequired()])
    confirm_passwored = PasswordField('Confirm Password', validators=[DataRequired()])