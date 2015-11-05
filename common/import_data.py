import csv, os
from django.db import transaction
from mould.api import JobWorkSerializer


def format_date(str):
    str_parts = str.split('.')
    date = ''
    for part in str_parts:
        part = part.zfill(2)
    return '.'.join(str_parts)

@transaction.atomic
def import_data():

    file_name = os.path.join('common', 'data.csv')

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    with open(os.path.join(BASE_DIR, file_name), 'r', newline='', encoding = "ISO-8859-1") as csvfile:
        reader = csv.reader(csvfile)
        index = 0
        for row in reader:
            if index == 5888:
                break
            if index == 0:
                index += 1
                continue
            if not row[0] or row[0]=='':
                continue
            row_object = {}
            if row[1]:
                row_object.update({'date': format_date(row[1])})
            if row[2]:
                row_object.update({'client': {'name': row[2]}})
            if row[3] and row[3].strip():
                row_object.update({'mould': {'name': row[3]}})
            if row[4]:
                row_object.update({'mould_detail': {'detail': row[4]}})
            if row[5]:
                row_object.update({'cavity': row[5]})
            if row[6]:
                row_object.update({'mould_type': {'detail': row[6]}})
            if row[7] and row[7].strip():
                row_object.update({'part': {'name': row[7]}})
            if row[8]:
                row_object.update({'drawing_no': row[8]})
            if row[9]:
                row_object.update({'challan_no': row[9]})
            if row[10]:
                row_object.update({'dispatch_date': format_date(row[10])})
            index += 1
            ser = JobWorkSerializer(data=row_object)
            if not ser.is_valid():
                print(ser.errors)
                print(row_object)
                raise Exception("error")
            else:
                ser.save()
