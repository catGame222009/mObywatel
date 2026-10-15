import os, glob

# Czysto binarnie - tylko zastępuje ASCII bajty, nie dotyka polskich znaków
replacements = [
    (b'initial-scale=0.85', b'initial-scale=1.0 '),  # same length +space
    (b'initial-scale=0.8,',  b'initial-scale=1.0,'),  # same length
]

count = 0
for path in glob.glob('*.html'):
    with open(path, 'rb') as f:
        data = f.read()
    new_data = data
    for old, new in replacements:
        new_data = new_data.replace(old, new)
    if new_data != data:
        with open(path, 'wb') as f:
            f.write(new_data)
        count += 1
        print(f'Fixed: {path}')

print(f'Total fixed: {count}')
