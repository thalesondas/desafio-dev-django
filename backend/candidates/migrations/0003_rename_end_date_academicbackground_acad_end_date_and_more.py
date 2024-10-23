# Generated by Django 5.1.2 on 2024-10-22 02:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("candidates", "0002_remove_academicbackground_personal_info_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="academicbackground",
            old_name="end_date",
            new_name="acad_end_date",
        ),
        migrations.RenameField(
            model_name="academicbackground",
            old_name="start_date",
            new_name="acad_start_date",
        ),
        migrations.RenameField(
            model_name="professionalexperience",
            old_name="end_date",
            new_name="exp_end_date",
        ),
        migrations.RenameField(
            model_name="professionalexperience",
            old_name="start_date",
            new_name="exp_start_date",
        ),
        migrations.AlterField(
            model_name="academicbackground",
            name="contact_info",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="academic_backgrounds",
                to="candidates.contactinfo",
            ),
        ),
        migrations.AlterField(
            model_name="personalinfo",
            name="contact_info",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="personal_info",
                to="candidates.contactinfo",
            ),
        ),
        migrations.AlterField(
            model_name="professionalexperience",
            name="contact_info",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="professional_experiences",
                to="candidates.contactinfo",
            ),
        ),
        migrations.AlterField(
            model_name="professionalexperience",
            name="description",
            field=models.TextField(blank=True, null=True),
        ),
    ]