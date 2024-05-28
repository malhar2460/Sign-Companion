from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True,auto_created=True)
    username = models.TextField()
    passwd = models.CharField(max_length=128)
    email = models.EmailField()

    class Meta:
        db_table = 'User'
    
    def __str__(self):
        return self.username

class Sign_to_text(models.Model):
    img_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name='signs')
    sign = models.BinaryField()

    class Meta:
        db_table = 'Sign_to_text'
    
    def __str__(self):
        return str(self.img_id)
    
class Text_to_sign(models.Model):
    text_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name='texts')
    text = models.TextField()

    class Meta:
        db_table = 'Text_to_sign'
    
    def __str__(self):
        return str(self.text_id)

