# Generated by Django 4.1.7 on 2023-07-06 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0012_sign_to_text_text_to_sign_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sign_to_text',
            name='sign',
            field=models.BinaryField(),
        ),
    ]