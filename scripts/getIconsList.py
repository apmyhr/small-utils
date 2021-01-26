# Get the list of icons from an icon CSS file

import os
import json

script_dir = os.path.dirname(__file__)
print ("Running in {}".format(script_dir))

filename = os.path.join(script_dir, '../node_modules/@mdi/font/css/materialdesignicons.css')
output_path = os.path.join(script_dir, "../public/data/iconList.json")

icons = []

# Read from the CSS file
print("Attempting to read {}".format(filename))
with open(filename) as f:
    content = f.readlines()

for line in content:
    # Lines with the icon name will have a ::before
    # .mdi-abacus::before {
    parts = line.split("::before")
    if len(parts) == 2:
        icons.append(parts[0][1:])

# Write the list of icons to a file
print("Writting {} icons to {}".format(len(icons), output_path))
with open(output_path, "w") as f:
    f.write(json.dumps(icons))



