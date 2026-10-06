import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_resume(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor('#0f172a')
    accent_color = colors.HexColor('#b91c1c')
    text_dark = colors.HexColor('#1e293b')
    text_muted = colors.HexColor('#475569')

    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color
    )

    headline_style = ParagraphStyle(
        'DocHeadline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=accent_color
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_muted
    )

    section_heading = ParagraphStyle(
        'DocSection',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=4
    )

    item_title = ParagraphStyle(
        'DocItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=text_dark
    )

    item_subtitle = ParagraphStyle(
        'DocItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=text_muted
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_dark
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=text_dark,
        leftIndent=12
    )

    story = []

    # Header
    story.append(Paragraph("PRATIK SINGH", name_style))
    story.append(Paragraph("Full-Stack &amp; AI/ML Developer | B.Tech ECE (3rd Year)", headline_style))
    story.append(Spacer(1, 4))
    
    contact_text = (
        "<b>Email:</b> pratiksingh111204@gmail.com &nbsp;|&nbsp; "
        "<b>Phone:</b> +91 81274 06133 &nbsp;|&nbsp; "
        "<b>Location:</b> Varanasi, Uttar Pradesh<br/>"
        "<b>LinkedIn:</b> linkedin.com/in/pratik-singh0474382a0 &nbsp;|&nbsp; "
        "<b>GitHub:</b> github.com/Praticksingh"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=2, spaceAfter=8))

    # Summary
    summary_text = (
        "Third-year B.Tech Electronics &amp; Communication Engineering student building full-stack and "
        "AI/ML applications with React, TypeScript, Node.js, FastAPI, and Python. Experienced in autonomous CI/CD "
        "diagnostics, multi-agent LLM systems (LangGraph), and production-oriented software architectures with hackathon-driven problem solving."
    )
    story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", section_heading))
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))

    # Education
    story.append(Paragraph("<b>EDUCATION</b>", section_heading))
    edu_data = [
        [
            Paragraph("<b>IET DDU Gorakhpur University</b><br/><font color='#475569'>B.Tech in Electronics &amp; Communication Engineering (Currently 3rd Year)</font>", body_style),
            Paragraph("<b>2024 – 2028</b><br/><font color='#475569'>Gorakhpur, UP</font>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>S.T KC Memorial English School</b><br/><font color='#475569'>Intermediate (Class XII)</font>", body_style),
            Paragraph("<b>2023 – 2024</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Sushila Singh Public School</b><br/><font color='#475569'>High School (Class X)</font>", body_style),
            Paragraph("<b>2022 – 2023</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ]
    ]
    edu_table = Table(edu_data, colWidths=[400, 140])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 6))

    # Technical Skills
    story.append(Paragraph("<b>TECHNICAL SKILLS</b>", section_heading))
    skills_data = [
        [Paragraph("<b>Programming:</b>", body_style), Paragraph("Python, JavaScript, TypeScript, C, SQL, HTML", body_style)],
        [Paragraph("<b>Web / Full-Stack:</b>", body_style), Paragraph("React, Next.js, Node.js, Express.js, FastAPI, Vite, Tailwind CSS, REST APIs, Chart.js, D3.js", body_style)],
        [Paragraph("<b>Databases:</b>", body_style), Paragraph("PostgreSQL, MongoDB, Supabase, SQLAlchemy", body_style)],
        [Paragraph("<b>AI / ML:</b>", body_style), Paragraph("Machine Learning, Agentic AI, Multi-Agent Systems, LangGraph, LLM Applications, AI Orchestration", body_style)],
        [Paragraph("<b>DevOps &amp; Tools:</b>", body_style), Paragraph("Git, GitHub, GitHub API, Docker, Socket.IO, Vercel, Railway, Render, Power BI", body_style)],
        [Paragraph("<b>Marketing &amp; Creative:</b>", body_style), Paragraph("Social Media &amp; Digital Marketing, Content Strategy, SEO Fundamentals, Canva, CapCut", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[120, 420])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))

    # Projects
    story.append(Paragraph("<b>FEATURED PROJECTS</b>", section_heading))
    
    # Project 1
    p1_head = [
        [Paragraph("<b>AutoHeal AI</b> — Autonomous CI/CD Diagnostics Platform", item_title),
         Paragraph("<b>React, TypeScript, Express, Socket.IO, MongoDB</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_p1 = Table(p1_head, colWidths=[360, 180])
    t_p1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p1)
    story.append(Paragraph("• Built full-stack platform for repo analysis, CI/CD failure detection and automated fix workflows, pinpointing affected lines via GitHub API.", bullet_style))
    story.append(Paragraph("• Implemented real-time progress tracking from repo cloning to pipeline completion with React, TypeScript, Socket.IO, and MongoDB.", bullet_style))
    story.append(Paragraph("• Configured Vercel and Docker/Railway deployments with shared types and environment-based configuration.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 2
    p2_head = [
        [Paragraph("<b>OPDFlow AI</b> — Government Hospital OPD Queue Command Center", item_title),
         Paragraph("<b>React, TypeScript, Vite, Supabase, PostgreSQL</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_p2 = Table(p2_head, colWidths=[360, 180])
    t_p2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p2)
    story.append(Paragraph("• Engineered an OPD queue platform with AI-assisted triage, priority-aware queues, digital QR passes, and real-time congestion management.", bullet_style))
    story.append(Paragraph("• Implemented offline-first sync, multilingual accessibility, live display broadcast, wait-time forecasting, and Code Blue emergency workflows.", bullet_style))
    story.append(Paragraph("• Designed intuitive patient and staff workflows with dynamic staff allocation and audit reporting.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 3
    p3_head = [
        [Paragraph("<b>Anamnesis-AI</b> — Multi-Agent Decision-Intelligence Platform", item_title),
         Paragraph("<b>Next.js, FastAPI, LangGraph, Chart.js, Docker</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_p3 = Table(p3_head, colWidths=[360, 180])
    t_p3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p3)
    story.append(Paragraph("• Built multi-agent application simulating alternate histories and scenarios across economy, society, governance, sustainability, and tech.", bullet_style))
    story.append(Paragraph("• Designed orchestrator, domain, and critic agents with LangGraph, grounding reasoning in real-world datasets through retrieval.", bullet_style))
    story.append(Paragraph("• Features risk and feasibility evaluation, structured impact reports, and retrieval-grounded reasoning.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 4
    p4_head = [
        [Paragraph("<b>Cyber Fraud Detection Platform</b> — Full-Stack ML System", item_title),
         Paragraph("<b>FastAPI, ML, SQLAlchemy, React, Render, Vercel</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_p4 = Table(p4_head, colWidths=[360, 180])
    t_p4.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p4)
    story.append(Paragraph("• Built an end-to-end machine-learning platform for phone-number and behavioral risk analysis with a secure React frontend for real-time investigation.", bullet_style))
    story.append(Spacer(1, 4))

    # Project 5
    p5_head = [
        [Paragraph("<b>Pack&amp;Chew Website</b> — Booking &amp; Food Delivery Platform", item_title),
         Paragraph("<b>Full-Stack Web, Live Tracking</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_p5 = Table(p5_head, colWidths=[360, 180])
    t_p5.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_p5)
    story.append(Paragraph("• Bus and train ticket booking platform with integrated food services and live tracking.", bullet_style))
    story.append(Spacer(1, 6))

    # Experience
    story.append(Paragraph("<b>PROFESSIONAL EXPERIENCE</b>", section_heading))
    
    exp1_head = [
        [Paragraph("<b>Quickcartics Private Limited (Aryix)</b> — Social Media Growth Manager; Catalogue &amp; ERP Ops", item_title),
         Paragraph("<b>Sep 2026 – Nov 2026</b> (Hybrid)", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_exp1 = Table(exp1_head, colWidths=[380, 160])
    t_exp1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_exp1)
    story.append(Paragraph("• Fixed-term contract across social media growth, catalogue, and ERP operations for Aryix under manager guidance and confidentiality policies.", bullet_style))
    story.append(Spacer(1, 4))

    exp2_head = [
        [Paragraph("<b>The Social Era Digital Pvt. Ltd.</b> — Social Media Manager Intern", item_title),
         Paragraph("<b>Apr 2026 – Present</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_exp2 = Table(exp2_head, colWidths=[380, 160])
    t_exp2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_exp2)
    story.append(Paragraph("• Managed accounts across Instagram, Facebook, LinkedIn, Google Business. Built content strategies, calendars, and engagement campaigns.", bullet_style))
    story.append(Paragraph("• Performed competitor and trend analysis; collaborated seamlessly with design, video, and content teams.", bullet_style))
    story.append(Spacer(1, 4))

    exp3_head = [
        [Paragraph("<b>Suvidha Mahila Mandal (NGO)</b> — Social Media Marketing Intern", item_title),
         Paragraph("<b>Jul 2026 – Sep 2026</b> (Remote)", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_exp3 = Table(exp3_head, colWidths=[380, 160])
    t_exp3.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_exp3)
    story.append(Paragraph("• Remote six-day-a-week social media marketing internship with daily Google Meet meetings.", bullet_style))
    story.append(Spacer(1, 4))

    exp4_head = [
        [Paragraph("<b>Ai+ Technologies</b> — Product Experience Intern", item_title),
         Paragraph("<b>Oct 2025 – Mar 2026</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_exp4 = Table(exp4_head, colWidths=[380, 160])
    t_exp4.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_exp4)
    story.append(Paragraph("• Tested the Ai+ smartphone ecosystem and delivered actionable feature experience insights.", bullet_style))
    story.append(Spacer(1, 4))

    exp5_head = [
        [Paragraph("<b>Pinnacle Labs Pvt Ltd</b> — Web Development Intern", item_title),
         Paragraph("<b>Nov 2025 – Dec 2025</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))]
    ]
    t_exp5 = Table(exp5_head, colWidths=[380, 160])
    t_exp5.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story.append(t_exp5)
    story.append(Paragraph("• One-month web engineering program focused on practical web development and implementation.", bullet_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>Programs:</b> IBM SkillBuild Data Analytics (2025) &nbsp;|&nbsp; Deloitte Job Simulation via Forage (Jun 2025)", body_style))
    story.append(Spacer(1, 6))

    # Certifications & Achievements
    story.append(Paragraph("<b>CERTIFICATIONS &amp; ACHIEVEMENTS</b>", section_heading))
    cert_text = (
        "• <b>Certifications:</b> Internet of Things (IoT) – Samsung Innovation Campus (Jul–Sep 2025) &nbsp;|&nbsp; "
        "Digital Marketing – HubSpot Academy (Valid Jan 2027) &nbsp;|&nbsp; Social Media Marketing – Semrush Academy<br/>"
        "• <b>Leadership:</b> Secretary, TechSphere (Promoted from Social Media Head) &nbsp;|&nbsp; "
        "Co-Coordinator, Programming &amp; DBMS, IET TechSphere &nbsp;|&nbsp; Anchor, ARAMBH 1.0<br/>"
        "• <b>Hackathons &amp; Competitions:</b> RIFT '26 (Physics Wallah) &nbsp;|&nbsp; Paranox 2.0 (TechXNinjas) &nbsp;|&nbsp; "
        "Python Hackathon (IIT BHU) &nbsp;|&nbsp; Strategy Storm 2026 (IIT Guwahati)<br/>"
        "• <b>Workshops &amp; Sports:</b> Product Management (NextLeap x IIT Roorkee, 2025) &nbsp;|&nbsp; "
        "1st Rank, Volleyball &amp; Cricket (DDU Engineering Premier League, Feb 2025)"
    )
    story.append(Paragraph(cert_text, body_style))

    doc.build(story)
    print(f"Generated resume successfully at: {output_path}")

if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), 'public', 'Pratik-Singh-Resume.pdf')
    generate_resume(out)
