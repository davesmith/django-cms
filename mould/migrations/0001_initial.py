# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobWork',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('job_date', models.DateField(blank=True, null=True, default=datetime.date.today)),
                ('cavity', models.IntegerField(blank=True, max_length=4, null=True)),
                ('drawing_no', models.CharField(blank=True, max_length=255, null=True)),
                ('challan_no', models.CharField(blank=True, max_length=255, null=True)),
                ('bill_no', models.CharField(blank=True, max_length=255, null=True)),
                ('dispatch_date', models.DateField(blank=True, null=True, default=datetime.date.today)),
                ('client', models.ForeignKey(blank=True, to='client.Client', null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Mould',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='MouldDetail',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('detail', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='MouldType',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('detail', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Part',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='jobwork',
            name='mould',
            field=models.ForeignKey(blank=True, to='mould.Mould', null=True),
        ),
        migrations.AddField(
            model_name='jobwork',
            name='mould_detail',
            field=models.ForeignKey(blank=True, to='mould.MouldDetail', null=True),
        ),
        migrations.AddField(
            model_name='jobwork',
            name='mould_type',
            field=models.ForeignKey(blank=True, to='mould.MouldType', null=True),
        ),
        migrations.AddField(
            model_name='jobwork',
            name='part',
            field=models.ForeignKey(blank=True, to='mould.Part', null=True),
        ),
    ]
