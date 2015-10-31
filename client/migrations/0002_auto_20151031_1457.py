# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='address',
            field=models.CharField(null=True, blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='client',
            name='email',
            field=models.EmailField(null=True, blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='client',
            name='phone',
            field=models.CharField(null=True, blank=True, max_length=16),
        ),
    ]
