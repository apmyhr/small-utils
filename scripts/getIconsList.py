# Get the list of icons from an icon CSS file

import os
import json
import yaml

script_dir = os.path.dirname(__file__)
print ("Running in {}".format(script_dir))

# Mdi filenames.  Array in case we add more of them.
filenames = [
    os.path.join(script_dir, '../node_modules/@mdi/font/css/materialdesignicons.css'),
]

font_awesome_filename = os.path.join(script_dir, '../node_modules/@fortawesome/fontawesome-free/metadata/icons.yml')

material_design_filename = os.path.join(script_dir, "../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.json")

output_path = os.path.join(script_dir, "../public/data/iconList.json")

icons = []
fab_icons = []


for filename in filenames:
    # Read from the CSS file
    print("Attempting to read {}".format(filename))
    with open(filename) as f:
        content = f.readlines()

    for line in content:
        # Lines with the icon name will have a :before
        # .mdi-abacus::before {
        parts = line.split("::before")
        if len(parts) == 2:
            icon_name = parts[0]
            # Trim any begining period
            icon_name = icon_name.lstrip('.')

            # Ignore these lines, they are not valid
            if icon_name.startswith("&"):
                continue

            icons.append(icon_name)

# Process Font Awesome using the YAML file
print("Attempting to read {}".format(font_awesome_filename))
with open(font_awesome_filename, 'r') as f:
    data = yaml.load(f, Loader=yaml.FullLoader)
    print("Found {} Icons from icons.YML".format(len(data)))

for icon_name in data:
    icon_data = data[icon_name]
    if 'brands' in icon_data['styles']:
        icons.append('fab fa-' + icon_name)
    else:
        icons.append('fas fa-' + icon_name)

# Process Material Design JSON file
print("Attempting to read {}".format(material_design_filename))
with open(material_design_filename, 'r') as f:
    data = json.load(f)
    print("Found {} Icons from MaterialIcons-Regular.json".format(len(data)))

for icon_name in data:
    icons.append(icon_name)

# Write the list of icons to a file
print("Writting {} icons to {}".format(len(icons), output_path))
with open(output_path, "w") as f:
    f.write(json.dumps(icons))



