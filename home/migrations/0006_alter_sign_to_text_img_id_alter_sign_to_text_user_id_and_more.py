# Generated by Django 4.1.7 on 2023-07-06 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_alter_sign_to_text_img_id_alter_text_to_sign_text_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sign_to_text',
            name='img_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='sign_to_text',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='signs', to='home.user'),
        ),
        migrations.AlterField(
            model_name='text_to_sign',
            name='text_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='text_to_sign',
            name='user_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='texts', to='home.user'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
