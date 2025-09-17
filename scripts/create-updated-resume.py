from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import os

# Create the resume directory if it doesn't exist
os.makedirs('public/resume', exist_ok=True)

# Create the PDF document
doc = SimpleDocTemplate("public/resume/vijay-chalendra-resume.pdf", pagesize=letter,
                        rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)

# Get sample styles and create custom styles
styles = getSampleStyleSheet()
story = []

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=20,
    spaceAfter=6,
    alignment=TA_CENTER,
    textColor=colors.black,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=14,
    spaceAfter=6,
    spaceBefore=12,
    textColor=colors.black,
    fontName='Helvetica-Bold'
)

subheading_style = ParagraphStyle(
    'CustomSubheading',
    parent=styles['Heading3'],
    fontSize=12,
    spaceAfter=3,
    spaceBefore=6,
    textColor=colors.black,
    fontName='Helvetica-Bold'
)

normal_style = ParagraphStyle(
    'CustomNormal',
    parent=styles['Normal'],
    fontSize=10,
    spaceAfter=3,
    alignment=TA_LEFT,
    fontName='Helvetica'
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontSize=10,
    alignment=TA_CENTER,
    spaceAfter=3,
    fontName='Helvetica'
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontSize=10,
    spaceAfter=2,
    leftIndent=20,
    fontName='Helvetica'
)

# Header - Name
story.append(Paragraph("Vijay Chalendra", title_style))
story.append(Spacer(1, 6))

# Contact Information
story.append(Paragraph("3-9-329/C Reddy Colony, Hanumakonda, Telangana 506011", contact_style))
story.append(Spacer(1, 6))

# Contact details in a more organized way
contact_table_data = [
    ["8500759824", "chalendravijay09@gmail.com"],
    ["linkedin.com/in/vijay-chalendra-3a771428a", "github.com/VijayChCode"]
]

contact_table = Table(contact_table_data, colWidths=[2.5*inch, 2.5*inch])
contact_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(contact_table)
story.append(Spacer(1, 12))

# Education Section
story.append(Paragraph("Education", heading_style))

# Education details
education_data = [
    ["Kakatiya Institute of Technology and Science", "Nov. 2022 – June 2026"],
    ["Bachelor of Science in Computer Science", "Warangal, Telangana"],
    ["CGPA: 9.43", ""]
]

education_table = Table(education_data, colWidths=[4*inch, 2*inch])
education_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (0, -1), 'LEFT'),
    ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))

story.append(education_table)
story.append(Spacer(1, 8))

# Relevant Coursework
story.append(Paragraph("Relevant Coursework", subheading_style))

coursework_items = [
    "Data Structures", "Software Methodology", "Algorithms Analysis", "Database Management",
    "Artificial Intelligence", "Internet Technology", "Systems Programming", "Computer Architecture"
]

# Create coursework in two columns
coursework_data = []
for i in range(0, len(coursework_items), 2):
    row = [f"• {coursework_items[i]}"]
    if i + 1 < len(coursework_items):
        row.append(f"• {coursework_items[i + 1]}")
    else:
        row.append("")
    coursework_data.append(row)

coursework_table = Table(coursework_data, colWidths=[3*inch, 3*inch])
coursework_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))

story.append(coursework_table)
story.append(Spacer(1, 12))

# Certifications Section
story.append(Paragraph("Certifications", heading_style))

# Certification 1
story.append(Paragraph("<b>Introduction to CyberSecurity | Cisco Platform</b>", subheading_style))
story.append(Paragraph("• Institution: Cisco Networking Academy", bullet_style))
story.append(Paragraph("• Date Earned: July 2024", bullet_style))
story.append(Paragraph("• Key Concepts: Cybersecurity fundamentals, threat identification, CIA triad, ethical considerations", bullet_style))
story.append(Paragraph("• Implemented Knowledge on developing Cisco PacketTracer", bullet_style))
story.append(Spacer(1, 6))

# Certification 2
story.append(Paragraph("<b>Introduction to Packet Tracer | NetCad Academy</b>", subheading_style))
story.append(Paragraph("• Institution: Cisco Networking Academy", bullet_style))
story.append(Paragraph("• Date Earned: July 2024", bullet_style))
story.append(Paragraph("• Network simulation, configuration and troubleshooting, routing and switching concepts, protocol analysis", bullet_style))
story.append(Spacer(1, 6))

# Certification 3
story.append(Paragraph("<b>FrontEnd Development-HTML | Great Learning Academy</b>", subheading_style))
story.append(Paragraph("• Institution: Great Learning Academy", bullet_style))
story.append(Paragraph("• Date Earned: November 2024", bullet_style))
story.append(Paragraph("• Key Skills: HTML, CSS, JavaScript, and front-end frameworks", bullet_style))
story.append(Spacer(1, 12))

# Technical Skills Section
story.append(Paragraph("Technical Skills", heading_style))

skills_data = [
    ["Languages:", "Python, Java, C, HTML/CSS, JavaScript, SQL"],
    ["Developer Tools:", "VS Code, Git"],
    ["Technologies/Frameworks:", "JS, Git, GitHub"],
    ["Soft Skills:", "Communication, Teamwork, Adaptability"]
]

skills_table = Table(skills_data, colWidths=[1.5*inch, 4.5*inch])
skills_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (0, -1), 'LEFT'),
    ('ALIGN', (1, 0), (1, -1), 'LEFT'),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
    ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))

story.append(skills_table)
story.append(Spacer(1, 12))

# Leadership / Extracurricular Section
story.append(Paragraph("Leadership / Extracurricular", heading_style))

# Course Patent Presentation
story.append(Paragraph("<b>Course Patent Presentation</b> - Spring 2023", subheading_style))
story.append(Paragraph("Kakatiya Institute of Technology and Science", normal_style))
story.append(Paragraph("• Delivered an in-depth presentation on innovative data routing algorithms, emphasizing optimization techniques and patentable advancements, as part of an academic course.", bullet_style))
story.append(Spacer(1, 6))

# Seminar Presentation
story.append(Paragraph("<b>Seminar Presentation</b> - September 2024", subheading_style))
story.append(Paragraph("Kakatiya Institute of Technology and Science", normal_style))
story.append(Paragraph("• Presented a comprehensive seminar on Neuralink, covering the intersection of neuroscience and technology, with a focus on brain-machine interfaces and their future implications.", bullet_style))

# Build the PDF
doc.build(story)

print("Resume PDF created successfully at public/resume/vijay-chalendra-resume.pdf")
