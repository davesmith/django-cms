# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mould', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobwork',
            name='client',
            field=models.ForeignKey(related_name='jobworks', null=True, blank=True, to='client.Client'),
        ),
        migrations.AlterField(
            model_name='jobwork',
            name='mould',
            field=models.ForeignKey(related_name='jobworks', null=True, blank=True, to='mould.Mould'),
        ),
        migrations.AlterField(
            model_name='jobwork',
            name='mould_detail',
            field=models.ForeignKey(related_name='jobworks', null=True, blank=True, to='mould.MouldDetail'),
        ),
        migrations.AlterField(
            model_name='jobwork',
            name='mould_type',
            field=models.ForeignKey(related_name='jobworks', null=True, blank=True, to='mould.MouldType'),
        ),
        migrations.AlterField(
            model_name='jobwork',
            name='part',
            field=models.ForeignKey(related_name='jobworks', null=True, blank=True, to='mould.Part'),
        ),
    ]
