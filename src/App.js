import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Wrench,
  Ruler,
  Factory,
  Flame,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Award,
  Briefcase,
  ThumbsUp,
  BadgeCheck
} from 'lucide-react';
import './App.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <h3 className="text-xl text-white font-display pr-4">{question}</h3>
        <ChevronDown
          size={22}
          className={`text-accent flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-6 text-muted leading-relaxed text-base font-body">
          {answer}
        </p>
      </div>
    </div>
  );
};

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      gallery: 'Gallery',
      process: 'Process',
      faq: 'FAQ'
    },
    hero: {
      eyebrow: 'Precision Metalwork',
      title: 'Industrial strength,',
      titleAccent: 'crafted with elegance.',
      description:
        'We design and fabricate premium metal solutions for demanding environments. Every weld is engineered to perform, and every finish is built to impress.',
      primaryCta: 'Explore Services',
      secondaryCta: 'View Portfolio'
    },
    experience: {
      eyebrow: 'Certified Professionals',
      title: 'Proven craftsmanship for demanding environments.',
      description:
        'WelDone pairs traditional craftsmanship with precision engineering to deliver projects that stand the test of time. Our team is trained, certified, and obsessed with detail.',
      pills: ['Licensed & Insured', 'Quality Guaranteed', 'Safety Compliant', 'Dedicated Project Manager'],
      stats: [
        { label: 'Years Experience', value: '20+' },
        { label: 'Projects Completed', value: '500+' },
        { label: 'Client Satisfaction', value: '98%' },
        { label: 'Certified Welders', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: 'Workshop Highlights',
      title: 'Craft in motion',
      description:
        'A curated glimpse into recent projects, showcasing the level of finish and detail we bring to every build.'
    },
    services: {
      eyebrow: 'Core Services',
      title: 'Precision services built for scale.',
      description:
        'From conceptual design to the final weld, our services are tailored for performance, safety, and long-term value.',
      items: [
        {
          title: 'Custom Rail Systems',
          description: 'Architectural rails and handrails engineered for safety and style.'
        },
        {
          title: 'Canopies & Awnings',
          description: 'Weather-resistant covers fabricated with premium metals.'
        },
        {
          title: 'Steel Fabrication',
          description: 'Full-scale fabrication for commercial and industrial needs.'
        },
        {
          title: 'Precision Repairs',
          description: 'Rapid-response fixes that restore structural integrity.'
        },
        {
          title: 'Decorative Metalwork',
          description: 'Signature pieces that bring character to your space.'
        },
        {
          title: 'Heavy-Duty Welding',
          description: 'Certified welders delivering flawless seams under pressure.'
        }
      ]
    },
    projects: {
      eyebrow: 'Portfolio',
      title: 'Projects with presence',
      description:
        'Every piece is engineered with structural integrity and finished to elevate the space.',
      items: [
        {
          title: 'Structural Frames',
          description: 'Engineered steel frameworks built for heavy-duty performance.'
        },
        {
          title: 'Precision Welding',
          description: 'MIG, TIG, and arc welding delivered with surgical accuracy.'
        },
        {
          title: 'Architectural Metal',
          description: 'Elegant metalwork that elevates modern architecture.'
        },
        {
          title: 'Industrial Maintenance',
          description: 'Repair and reinforcement programs that extend asset life.'
        },
        {
          title: 'Custom Fabrication',
          description: 'One-of-a-kind pieces, prototyped and refined in-house.'
        },
        {
          title: 'High-End Finishes',
          description: 'Surface treatments that protect and enhance every build.'
        }
      ]
    },
    process: {
      eyebrow: 'Our Process',
      title: 'A refined workflow for premium outcomes.',
      description:
        'We manage every phase with discipline so your project stays on time, on budget, and on brand.',
      steps: [
        {
          number: '01',
          title: 'Consult & Assess',
          description: 'We map your goals, constraints, and timeline with a detailed site review.'
        },
        {
          number: '02',
          title: 'Design & Engineer',
          description: 'Detailed drawings, materials, and compliance checks before fabrication.'
        },
        {
          number: '03',
          title: 'Fabricate & Finish',
          description: 'Precision fabrication followed by protective finishing and QA.'
        },
        {
          number: '04',
          title: 'Install & Support',
          description: 'On-site delivery, installation, and long-term maintenance guidance.'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Clarity before we build',
      description: 'Answers to the most common questions we receive from clients.',
      items: [
        {
          question: 'What types of welding do you specialize in?',
          answer:
            'We specialize in MIG, TIG, and arc welding for structural, architectural, and industrial applications.'
        },
        {
          question: 'How long does a typical project take?',
          answer:
            'Timelines depend on scope and complexity. We provide a clear schedule after the initial assessment.'
        },
        {
          question: 'Do you provide free estimates?',
          answer:
            'Yes. We offer complimentary estimates with a detailed breakdown of labor, materials, and timeline.'
        },
        {
          question: 'Are you licensed and insured?',
          answer:
            'Absolutely. We are fully licensed, bonded, and insured, with AWS-certified professionals.'
        },
        {
          question: 'What materials do you work with?',
          answer:
            'We work with steel, stainless steel, aluminum, and specialty alloys depending on project requirements.'
        },
        {
          question: 'Do you offer warranties?',
          answer:
            'Yes. Warranty terms are tailored to project type and clearly outlined in your contract.'
        }
      ]
    },
    comments: {
      eyebrow: 'Client Notes',
      title: 'Comments from verified clients',
      description:
        'Share your experience with WelDone. A valid client code is required to post.',
      formTitle: 'Leave a comment',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      codeLabel: 'Client code',
      codePlaceholder: 'Enter your client code',
      messageLabel: 'Comment',
      messagePlaceholder: 'Tell us about your project and the outcome.',
      submit: 'Post comment',
      submitting: 'Submitting...',
      loading: 'Loading comments...',
      empty: 'No comments yet. Be the first to share your experience.',
      success: 'Thanks! Your comment was submitted.',
      error: 'We could not submit your comment. Please check your client code.'
    },
    contactSection: {
      eyebrow: 'Contact',
      title: 'Let’s plan your next build.',
      description:
        'Talk to our team about scope, timing, and the right fabrication path for your space.',
      hoursTitle: 'Call hours',
      hours: 'Mon–Fri 8:00–18:00, Sat 9:00–13:00 (AEST)',
      phoneTitle: 'WhatsApp + Phone',
      phone: '+61 405 825 996',
      phoneNote: 'Fastest response via WhatsApp.',
      emailTitle: 'Email',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: 'Request Consultation',
      title: 'Request a consultation',
      description: 'Share project details and attach reference photos if available.',
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      projectLabel: 'Project description',
      projectPlaceholder: 'Materials, dimensions, location, and timeline.',
      filesLabel: 'Reference photos',
      filesHelper: 'Attach any sketches or site photos (optional).',
      submit: 'Send request',
      cancel: 'Cancel',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: 'New consultation request',
      emailIntro: 'New consultation request from the website',
      noFiles: 'No files attached'
    },
    footer: {
      eyebrow: 'Ready to start?',
      title: "Let's build something that lasts.",
      sub: 'Built for strength, engineered for precision, finished with care.',
      ctaPrimary: 'Explore Services',
      ctaSecondary: 'View Portfolio',
      brand:
        'Premium welding and fabrication services built for performance, longevity, and clean architectural finish.',
      company: 'Company',
      contact: 'Contact',
      credentials: 'Credentials',
      credentialsItems: ['Licensed & Insured', 'AWS Certified', 'Safety Compliant', 'Project Warranty'],
      bottomLeft: '© 2024 WelDone. All rights reserved.',
      bottomRight: ['Precision Fabrication', 'On-Time Delivery']
    },
    language: 'Language'
  },
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      projects: 'Proyectos',
      gallery: 'Galería',
      process: 'Proceso',
      faq: 'FAQ'
    },
    hero: {
      eyebrow: 'Metalurgia de precisión',
      title: 'Fuerza industrial,',
      titleAccent: 'con elegancia.',
      description:
        'Diseñamos y fabricamos soluciones metálicas premium para entornos exigentes. Cada soldadura se optimiza para rendimiento y cada acabado impresiona.',
      primaryCta: 'Ver servicios',
      secondaryCta: 'Ver portafolio'
    },
    experience: {
      eyebrow: 'Profesionales certificados',
      title: 'Artesanía comprobada para entornos exigentes.',
      description:
        'WelDone combina la tradición con ingeniería de precisión para entregar proyectos duraderos. Nuestro equipo está capacitado, certificado y enfocado en los detalles.',
      pills: ['Licencia y seguro', 'Calidad garantizada', 'Cumplimiento de seguridad', 'Gerente dedicado'],
      stats: [
        { label: 'Años de experiencia', value: '20+' },
        { label: 'Proyectos completados', value: '500+' },
        { label: 'Satisfacción de clientes', value: '98%' },
        { label: 'Soldadores certificados', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: 'Destacados del taller',
      title: 'Trabajo en movimiento',
      description:
        'Una selección de proyectos recientes que muestra nuestro nivel de acabado y detalle.'
    },
    services: {
      eyebrow: 'Servicios clave',
      title: 'Servicios precisos para crecer.',
      description:
        'Desde el diseño hasta la soldadura final, nuestros servicios se enfocan en desempeño, seguridad y valor a largo plazo.',
      items: [
        { title: 'Barandales a medida', description: 'Barandales arquitectónicos seguros y estéticos.' },
        { title: 'Cubiertas y toldos', description: 'Protección resistente con metales de alta calidad.' },
        { title: 'Fabricación de acero', description: 'Fabricación integral para industria y comercio.' },
        { title: 'Reparaciones de precisión', description: 'Correcciones rápidas para recuperar integridad.' },
        { title: 'Metal decorativo', description: 'Piezas distintivas que elevan tu espacio.' },
        { title: 'Soldadura pesada', description: 'Soldadores certificados con uniones impecables.' }
      ]
    },
    projects: {
      eyebrow: 'Portafolio',
      title: 'Proyectos con presencia',
      description:
        'Cada pieza se construye con integridad estructural y acabados que elevan el espacio.',
      items: [
        { title: 'Estructuras principales', description: 'Marcos de acero diseñados para alto desempeño.' },
        { title: 'Soldadura de precisión', description: 'MIG, TIG y arco con máxima exactitud.' },
        { title: 'Metal arquitectónico', description: 'Detalles metálicos que elevan la arquitectura.' },
        { title: 'Mantenimiento industrial', description: 'Reparaciones y refuerzos para mayor vida útil.' },
        { title: 'Fabricación a medida', description: 'Piezas únicas y prototipos internos.' },
        { title: 'Acabados premium', description: 'Tratamientos que protegen y embellecen.' }
      ]
    },
    process: {
      eyebrow: 'Nuestro proceso',
      title: 'Un flujo refinado para resultados premium.',
      description:
        'Gestionamos cada fase con disciplina para cumplir tiempos, presupuesto y calidad.',
      steps: [
        { number: '01', title: 'Consulta y evaluación', description: 'Definimos objetivos, límites y plazos.' },
        { number: '02', title: 'Diseño e ingeniería', description: 'Planos detallados y revisión de materiales.' },
        { number: '03', title: 'Fabricación y acabado', description: 'Fabricación precisa y control de calidad.' },
        { number: '04', title: 'Instalación y soporte', description: 'Entrega e instalación con soporte continuo.' }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Claridad antes de construir',
      description: 'Respuestas a las preguntas más comunes de nuestros clientes.',
      items: [
        { question: '¿En qué tipos de soldadura se especializan?', answer: 'MIG, TIG y soldadura por arco.' },
        { question: '¿Cuánto dura un proyecto típico?', answer: 'Depende del alcance; entregamos un cronograma claro.' },
        { question: '¿Ofrecen cotizaciones gratuitas?', answer: 'Sí, con desglose de tiempos y materiales.' },
        { question: '¿Están licenciados y asegurados?', answer: 'Sí, totalmente licenciados y asegurados.' },
        { question: '¿Con qué materiales trabajan?', answer: 'Acero, acero inoxidable, aluminio y aleaciones.' },
        { question: '¿Ofrecen garantía?', answer: 'Sí, según el tipo de proyecto.' }
      ]
    },
    comments: {
      eyebrow: 'Comentarios',
      title: 'Opiniones de clientes verificados',
      description:
        'Comparte tu experiencia con WelDone. Se requiere un código de cliente válido.',
      formTitle: 'Dejar un comentario',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      codeLabel: 'Código de cliente',
      codePlaceholder: 'Ingresa tu código',
      messageLabel: 'Comentario',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto y el resultado.',
      submit: 'Publicar comentario',
      submitting: 'Enviando...',
      loading: 'Cargando comentarios...',
      empty: 'Aún no hay comentarios. Sé el primero en compartir.',
      success: '¡Gracias! Tu comentario fue enviado.',
      error: 'No se pudo enviar. Revisa tu código de cliente.'
    },
    contactSection: {
      eyebrow: 'Contacto',
      title: 'Planifiquemos tu próximo proyecto.',
      description:
        'Habla con nuestro equipo sobre alcance, tiempos y la mejor solución de fabricación.',
      hoursTitle: 'Horario de llamadas',
      hours: 'Lun–Vie 8:00–18:00, Sáb 9:00–13:00 (AEST)',
      phoneTitle: 'WhatsApp + Teléfono',
      phone: '+61 405 825 996',
      phoneNote: 'Respuesta más rápida por WhatsApp.',
      emailTitle: 'Correo',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: 'Solicitar consulta',
      title: 'Solicita una consulta',
      description: 'Comparte detalles del proyecto y adjunta fotos de referencia.',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Tu nombre',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: 'Correo',
      emailPlaceholder: 'tu@correo.com',
      projectLabel: 'Descripción del proyecto',
      projectPlaceholder: 'Materiales, dimensiones, ubicación y tiempos.',
      filesLabel: 'Fotos de referencia',
      filesHelper: 'Adjunta bocetos o fotos del sitio (opcional).',
      submit: 'Enviar solicitud',
      cancel: 'Cancelar',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: 'Nueva solicitud de consulta',
      emailIntro: 'Nueva solicitud de consulta desde el sitio web',
      noFiles: 'Sin archivos adjuntos'
    },
    footer: {
      eyebrow: '¿Listos para comenzar?',
      title: 'Construyamos algo duradero.',
      sub: 'Fuerza, precisión y acabados impecables.',
      ctaPrimary: 'Ver servicios',
      ctaSecondary: 'Ver portafolio',
      brand:
        'Servicios premium de soldadura y fabricación para desempeño, durabilidad y diseño.',
      company: 'Empresa',
      contact: 'Contacto',
      credentials: 'Credenciales',
      credentialsItems: ['Licencia y seguro', 'Certificación AWS', 'Cumplimiento de seguridad', 'Garantía de proyecto'],
      bottomLeft: '© 2024 WelDone. Todos los derechos reservados.',
      bottomRight: ['Fabricación de precisión', 'Entrega a tiempo']
    },
    language: 'Idioma'
  },
  zh: {
    nav: {
      home: '首页',
      services: '服务',
      projects: '项目',
      gallery: '画廊',
      process: '流程',
      faq: '常见问题'
    },
    hero: {
      eyebrow: '精密金属工艺',
      title: '工业级强度，',
      titleAccent: '兼具优雅设计。',
      description:
        '我们为高要求环境打造高端金属解决方案。每一道焊缝都为性能而生，每一次收尾都追求卓越。',
      primaryCta: '查看服务',
      secondaryCta: '查看作品'
    },
    experience: {
      eyebrow: '认证专业团队',
      title: '为严苛环境打造的工艺实力。',
      description:
        'WelDone 将传统工艺与精密工程结合，交付经得起时间考验的项目。团队训练有素、持证上岗、追求细节。',
      pills: ['持证 & 保险齐全', '质量保障', '安全合规', '专属项目经理'],
      stats: [
        { label: '从业年限', value: '20+' },
        { label: '完成项目', value: '500+' },
        { label: '客户满意度', value: '98%' },
        { label: '认证焊工', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: '车间亮点',
      title: '工艺进行中',
      description: '精选近期项目，展示我们的精细度与质感。'
    },
    services: {
      eyebrow: '核心服务',
      title: '面向规模化的精密服务。',
      description: '从概念设计到最终焊接，我们提供性能、安全与长期价值。',
      items: [
        { title: '定制栏杆系统', description: '安全与美感兼具的建筑级栏杆。' },
        { title: '雨棚与遮阳', description: '耐候金属材料打造的高端遮蔽。' },
        { title: '钢结构制造', description: '面向商业与工业的整套制造服务。' },
        { title: '精密修复', description: '快速修复，恢复结构完整性。' },
        { title: '装饰金属工艺', description: '为空间增添风格的标志性金属作品。' },
        { title: '重型焊接', description: '认证焊工在高压力下实现完美焊缝。' }
      ]
    },
    projects: {
      eyebrow: '作品集',
      title: '有存在感的项目',
      description: '每一件作品都兼具结构强度与精致收尾。',
      items: [
        { title: '结构框架', description: '为重载而生的工程钢结构。' },
        { title: '精密焊接', description: 'MIG、TIG 与电弧焊的高精度执行。' },
        { title: '建筑金属', description: '提升建筑美感的金属工艺。' },
        { title: '工业维护', description: '维修与加固，延长资产寿命。' },
        { title: '定制制造', description: '一对一定制与原型打样。' },
        { title: '高端表面处理', description: '保护并提升整体质感的表面工艺。' }
      ]
    },
    process: {
      eyebrow: '我们的流程',
      title: '高质量成果的精炼流程。',
      description: '我们以严谨流程把控每个环节，确保准时与高品质。',
      steps: [
        { number: '01', title: '咨询评估', description: '了解需求与时间规划，进行现场评估。' },
        { number: '02', title: '设计与工程', description: '绘制图纸与材料审核，确保合规。' },
        { number: '03', title: '制造与收尾', description: '精密制造并进行保护与质检。' },
        { number: '04', title: '安装与支持', description: '现场安装与后续维护建议。' }
      ]
    },
    faq: {
      eyebrow: '常见问题',
      title: '开工前的清晰答复',
      description: '客户最常询问的问题与答案。',
      items: [
        { question: '你们擅长哪些焊接类型？', answer: '我们擅长 MIG、TIG 与电弧焊。' },
        { question: '项目周期一般多久？', answer: '会根据复杂度评估并给出明确时间表。' },
        { question: '提供免费报价吗？', answer: '是的，我们提供免费评估与报价。' },
        { question: '是否持证并有保险？', answer: '是的，持证、投保，焊工为 AWS 认证。' },
        { question: '可以处理哪些材料？', answer: '钢、不锈钢、铝以及特殊合金。' },
        { question: '有保修吗？', answer: '有，条款会在合同中清晰说明。' }
      ]
    },
    comments: {
      eyebrow: '客户反馈',
      title: '已验证客户评论',
      description: '分享你的 WelDone 体验。发布需要有效的客户代码。',
      formTitle: '留下评论',
      nameLabel: '姓名',
      namePlaceholder: '你的姓名',
      codeLabel: '客户代码',
      codePlaceholder: '输入客户代码',
      messageLabel: '评论',
      messagePlaceholder: '请描述你的项目与结果。',
      submit: '发布评论',
      submitting: '提交中...',
      loading: '正在加载评论…',
      empty: '暂无评论，欢迎率先分享。',
      success: '感谢！你的评论已提交。',
      error: '提交失败，请检查客户代码。'
    },
    contactSection: {
      eyebrow: '联系',
      title: '一起规划你的下一次制作。',
      description: '与团队沟通范围、时间与最合适的金属解决方案。',
      hoursTitle: '电话时间',
      hours: '周一至周五 8:00–18:00，周六 9:00–13:00（AEST）',
      phoneTitle: 'WhatsApp + 电话',
      phone: '+61 405 825 996',
      phoneNote: 'WhatsApp 回复最快。',
      emailTitle: '邮箱',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: '预约咨询',
      title: '预约咨询',
      description: '请分享项目细节，并可附上参考照片。',
      nameLabel: '姓名',
      namePlaceholder: '你的姓名',
      phoneLabel: '电话 / WhatsApp',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: '邮箱',
      emailPlaceholder: 'you@email.com',
      projectLabel: '项目描述',
      projectPlaceholder: '材料、尺寸、地点与时间需求。',
      filesLabel: '参考照片',
      filesHelper: '可上传草图或现场照片（可选）。',
      submit: '发送请求',
      cancel: '取消',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: '新的咨询请求',
      emailIntro: '来自网站的咨询请求',
      noFiles: '未附加文件'
    },
    footer: {
      eyebrow: '准备开始？',
      title: '一起打造经久耐用的作品。',
      sub: '为强度而生，为精度而设，为品质而成。',
      ctaPrimary: '查看服务',
      ctaSecondary: '查看作品',
      brand: '高端焊接与制造服务，兼顾性能、寿命与建筑美感。',
      company: '公司',
      contact: '联系',
      credentials: '资质',
      credentialsItems: ['持证 & 保险齐全', 'AWS 认证', '安全合规', '项目保修'],
      bottomLeft: '© 2024 WelDone. 版权所有。',
      bottomRight: ['精密制造', '准时交付']
    },
    language: '语言'
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      projects: 'المشاريع',
      gallery: 'المعرض',
      process: 'المنهج',
      faq: 'الأسئلة'
    },
    hero: {
      eyebrow: 'أعمال معدنية دقيقة',
      title: 'قوة صناعية،',
      titleAccent: 'بلمسة راقية.',
      description:
        'نصمم ونصنع حلولاً معدنية عالية الجودة للبيئات الصعبة. كل لحام محسوب للأداء، وكل تشطيب يلفت الانتباه.',
      primaryCta: 'استكشف الخدمات',
      secondaryCta: 'عرض الأعمال'
    },
    experience: {
      eyebrow: 'محترفون معتمدون',
      title: 'حِرفة موثوقة للبيئات الصعبة.',
      description:
        'تجمع WelDone بين الحِرفة التقليدية والهندسة الدقيقة لتقديم مشاريع تدوم. فريقنا مدرب ومعتمد ويهتم بالتفاصيل.',
      pills: ['مرخص ومؤمّن', 'جودة مضمونة', 'امتثال للسلامة', 'مدير مشروع مخصص'],
      stats: [
        { label: 'سنوات الخبرة', value: '20+' },
        { label: 'المشاريع المنجزة', value: '500+' },
        { label: 'رضا العملاء', value: '98%' },
        { label: 'لحّامون معتمدون', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: 'لمحات من الورشة',
      title: 'الحِرفة أثناء التنفيذ',
      description: 'لمحة منتقاة من أعمالنا الأخيرة وجودة التشطيب.'
    },
    services: {
      eyebrow: 'الخدمات الأساسية',
      title: 'خدمات دقيقة قابلة للتوسع.',
      description: 'من التصميم إلى اللحام، خدماتنا مبنية للأداء والأمان والقيمة.',
      items: [
        { title: 'أنظمة الدرابزين', description: 'درابزين هندسي يجمع بين الأمان والأناقة.' },
        { title: 'مظلات وعتبات', description: 'أغطية مقاومة للعوامل الجوية من معادن عالية الجودة.' },
        { title: 'تصنيع الفولاذ', description: 'تصنيع شامل للمشاريع التجارية والصناعية.' },
        { title: 'إصلاحات دقيقة', description: 'إصلاحات سريعة لاستعادة السلامة الهيكلية.' },
        { title: 'معدن زخرفي', description: 'قطع مميزة تضيف طابعاً للمكان.' },
        { title: 'لحام عالي التحمل', description: 'لحامات مثالية بأيدي معتمدة.' }
      ]
    },
    projects: {
      eyebrow: 'الأعمال',
      title: 'مشاريع بحضور قوي',
      description: 'كل قطعة مصممة بمتانة وتشطيب يرفع قيمة المكان.',
      items: [
        { title: 'هياكل إنشائية', description: 'هياكل فولاذية للأحمال الثقيلة.' },
        { title: 'لحام دقيق', description: 'MIG و TIG واللحام القوسي بدقة عالية.' },
        { title: 'معدن معماري', description: 'تفاصيل معدنية تعزز العمارة الحديثة.' },
        { title: 'صيانة صناعية', description: 'إصلاح وتعزيز لإطالة عمر الأصول.' },
        { title: 'تصنيع مخصص', description: 'قطع فريدة ونماذج أولية داخلية.' },
        { title: 'تشطيبات راقية', description: 'معالجات سطحية للحماية والجمال.' }
      ]
    },
    process: {
      eyebrow: 'منهجنا',
      title: 'خطوات محكمة لنتائج ممتازة.',
      description: 'ندير كل مرحلة بانضباط لضمان الجودة والوقت.',
      steps: [
        { number: '01', title: 'استشارة وتقييم', description: 'نحدد الأهداف والقيود والجداول بدقة.' },
        { number: '02', title: 'تصميم وهندسة', description: 'رسومات تفصيلية ومراجعة مواد ومعايير.' },
        { number: '03', title: 'تصنيع وتشطيب', description: 'تصنيع دقيق يتبعه تشطيب وفحص جودة.' },
        { number: '04', title: 'تركيب ودعم', description: 'تركيب موقعي وإرشادات صيانة.' }
      ]
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'وضوح قبل التنفيذ',
      description: 'إجابات عن أكثر الأسئلة شيوعاً.',
      items: [
        { question: 'ما أنواع اللحام المتخصصة؟', answer: 'نختص بـ MIG و TIG واللحام القوسي.' },
        { question: 'كم يستغرق المشروع عادة؟', answer: 'يعتمد على النطاق ونقدم جدولاً واضحاً.' },
        { question: 'هل لديكم تسعير مجاني؟', answer: 'نعم، نقدم تقديراً مجانياً بدون التزام.' },
        { question: 'هل أنتم مرخصون ومؤمنون؟', answer: 'نعم، مرخصون ومؤمنون ومعتمدون.' },
        { question: 'ما المواد التي تعملون بها؟', answer: 'الفولاذ والستانلس والألمنيوم وسبائك خاصة.' },
        { question: 'هل تقدمون ضماناً؟', answer: 'نعم، يتم تحديده في العقد.' }
      ]
    },
    comments: {
      eyebrow: 'آراء العملاء',
      title: 'تعليقات العملاء الموثقين',
      description: 'شارك تجربتك مع WelDone. يلزم رمز عميل صالح للنشر.',
      formTitle: 'أضف تعليقاً',
      nameLabel: 'الاسم',
      namePlaceholder: 'اسمك',
      codeLabel: 'رمز العميل',
      codePlaceholder: 'أدخل رمز العميل',
      messageLabel: 'التعليق',
      messagePlaceholder: 'احكِ لنا عن مشروعك والنتيجة.',
      submit: 'نشر التعليق',
      submitting: 'جارٍ الإرسال...',
      loading: 'جارٍ تحميل التعليقات...',
      empty: 'لا توجد تعليقات بعد. كن أول من يشارك.',
      success: 'شكراً! تم إرسال تعليقك.',
      error: 'تعذر الإرسال. تحقق من رمز العميل.'
    },
    contactSection: {
      eyebrow: 'تواصل',
      title: 'لنخطط لمشروعك القادم.',
      description: 'تحدث مع فريقنا حول النطاق والوقت وأفضل مسار للتصنيع.',
      hoursTitle: 'ساعات الاتصال',
      hours: 'الاثنين–الجمعة 8:00–18:00، السبت 9:00–13:00 (AEST)',
      phoneTitle: 'واتساب + هاتف',
      phone: '+61 405 825 996',
      phoneNote: 'أسرع رد عبر واتساب.',
      emailTitle: 'البريد الإلكتروني',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: 'طلب استشارة',
      title: 'طلب استشارة',
      description: 'شارك تفاصيل المشروع وأرفق صوراً مرجعية إن توفرت.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'اسمك',
      phoneLabel: 'الهاتف / واتساب',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'you@email.com',
      projectLabel: 'وصف المشروع',
      projectPlaceholder: 'المواد، الأبعاد، الموقع، والجدول الزمني.',
      filesLabel: 'صور مرجعية',
      filesHelper: 'أرفق رسومات أو صور الموقع (اختياري).',
      submit: 'إرسال الطلب',
      cancel: 'إلغاء',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: 'طلب استشارة جديد',
      emailIntro: 'طلب استشارة جديد من الموقع',
      noFiles: 'لا توجد ملفات مرفقة'
    },
    footer: {
      eyebrow: 'جاهز للبدء؟',
      title: 'لنصنع شيئاً يدوم.',
      sub: 'قوة، دقة، وتشطيب يليق بالمشروع.',
      ctaPrimary: 'استكشف الخدمات',
      ctaSecondary: 'عرض الأعمال',
      brand: 'خدمات لحام وتصنيع عالية الجودة للأداء والمتانة.',
      company: 'الشركة',
      contact: 'تواصل',
      credentials: 'الاعتمادات',
      credentialsItems: ['مرخص ومؤمّن', 'معتمد AWS', 'امتثال للسلامة', 'ضمان المشروع'],
      bottomLeft: '© 2024 WelDone. جميع الحقوق محفوظة.',
      bottomRight: ['تصنيع دقيق', 'التسليم في الوقت']
    },
    language: 'اللغة'
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      services: 'Dịch vụ',
      projects: 'Dự án',
      gallery: 'Bộ sưu tập',
      process: 'Quy trình',
      faq: 'FAQ'
    },
    hero: {
      eyebrow: 'Gia công kim loại chính xác',
      title: 'Sức mạnh công nghiệp,',
      titleAccent: 'hoàn thiện tinh tế.',
      description:
        'Chúng tôi thiết kế và chế tạo giải pháp kim loại cao cấp cho môi trường khắt khe. Mỗi mối hàn đều tối ưu hiệu năng và tính thẩm mỹ.',
      primaryCta: 'Xem dịch vụ',
      secondaryCta: 'Xem dự án'
    },
    experience: {
      eyebrow: 'Chuyên gia được chứng nhận',
      title: 'Tay nghề vững chắc cho môi trường khắt khe.',
      description:
        'WelDone kết hợp tay nghề truyền thống và kỹ thuật hiện đại để tạo ra công trình bền vững. Đội ngũ được đào tạo và chứng nhận.',
      pills: ['Có giấy phép & bảo hiểm', 'Đảm bảo chất lượng', 'Tuân thủ an toàn', 'Quản lý dự án chuyên trách'],
      stats: [
        { label: 'Năm kinh nghiệm', value: '20+' },
        { label: 'Dự án hoàn thành', value: '500+' },
        { label: 'Hài lòng khách hàng', value: '98%' },
        { label: 'Thợ hàn chứng nhận', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: 'Điểm nhấn xưởng',
      title: 'Quy trình chế tác',
      description: 'Một góc nhìn về các dự án gần đây và độ hoàn thiện tinh xảo.'
    },
    services: {
      eyebrow: 'Dịch vụ chủ lực',
      title: 'Dịch vụ chính xác cho quy mô lớn.',
      description: 'Từ thiết kế đến hàn, chúng tôi đảm bảo hiệu năng và an toàn lâu dài.',
      items: [
        { title: 'Lan can tùy chỉnh', description: 'Lan can kiến trúc an toàn và thẩm mỹ.' },
        { title: 'Mái che & hiên', description: 'Vật liệu bền bỉ, chống thời tiết.' },
        { title: 'Chế tạo thép', description: 'Gia công cho nhu cầu công nghiệp và thương mại.' },
        { title: 'Sửa chữa chính xác', description: 'Khôi phục kết cấu nhanh chóng.' },
        { title: 'Kim loại trang trí', description: 'Tạo điểm nhấn cho không gian.' },
        { title: 'Hàn tải nặng', description: 'Đường hàn chắc chắn, đạt chuẩn.' }
      ]
    },
    projects: {
      eyebrow: 'Danh mục',
      title: 'Dự án nổi bật',
      description: 'Mỗi sản phẩm đều đảm bảo độ bền và hoàn thiện cao cấp.',
      items: [
        { title: 'Khung kết cấu', description: 'Khung thép chịu tải nặng.' },
        { title: 'Hàn chính xác', description: 'MIG, TIG, hồ quang với độ chính xác cao.' },
        { title: 'Kim loại kiến trúc', description: 'Tôn vinh kiến trúc hiện đại.' },
        { title: 'Bảo trì công nghiệp', description: 'Sửa chữa và gia cố lâu dài.' },
        { title: 'Chế tạo tùy chỉnh', description: 'Thiết kế riêng và tạo mẫu.' },
        { title: 'Hoàn thiện cao cấp', description: 'Bảo vệ và nâng tầm bề mặt.' }
      ]
    },
    process: {
      eyebrow: 'Quy trình',
      title: 'Quy trình tinh gọn cho kết quả cao cấp.',
      description: 'Chúng tôi quản lý chặt chẽ từng giai đoạn.',
      steps: [
        { number: '01', title: 'Tư vấn & đánh giá', description: 'Xác định mục tiêu và kế hoạch chi tiết.' },
        { number: '02', title: 'Thiết kế & kỹ thuật', description: 'Bản vẽ và kiểm tra tiêu chuẩn.' },
        { number: '03', title: 'Gia công & hoàn thiện', description: 'Gia công chính xác và kiểm soát chất lượng.' },
        { number: '04', title: 'Lắp đặt & hỗ trợ', description: 'Lắp đặt tại chỗ và hướng dẫn bảo trì.' }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Rõ ràng trước khi thi công',
      description: 'Giải đáp các câu hỏi thường gặp.',
      items: [
        { question: 'Bạn chuyên những loại hàn nào?', answer: 'MIG, TIG và hàn hồ quang.' },
        { question: 'Thời gian dự án bao lâu?', answer: 'Phụ thuộc quy mô, chúng tôi sẽ đưa lịch rõ ràng.' },
        { question: 'Có báo giá miễn phí không?', answer: 'Có, chúng tôi báo giá miễn phí.' },
        { question: 'Có giấy phép và bảo hiểm không?', answer: 'Có, đầy đủ giấy phép và chứng nhận.' },
        { question: 'Bạn làm với vật liệu gì?', answer: 'Thép, inox, nhôm và hợp kim đặc biệt.' },
        { question: 'Có bảo hành không?', answer: 'Có, điều khoản sẽ nêu rõ trong hợp đồng.' }
      ]
    },
    comments: {
      eyebrow: 'Ý kiến khách hàng',
      title: 'Bình luận từ khách hàng đã xác thực',
      description: 'Chia sẻ trải nghiệm với WelDone. Cần mã khách hàng hợp lệ để đăng.',
      formTitle: 'Để lại bình luận',
      nameLabel: 'Tên',
      namePlaceholder: 'Tên của bạn',
      codeLabel: 'Mã khách hàng',
      codePlaceholder: 'Nhập mã khách hàng',
      messageLabel: 'Bình luận',
      messagePlaceholder: 'Hãy chia sẻ dự án và kết quả.',
      submit: 'Đăng bình luận',
      submitting: 'Đang gửi...',
      loading: 'Đang tải bình luận...',
      empty: 'Chưa có bình luận. Hãy là người đầu tiên chia sẻ.',
      success: 'Cảm ơn! Bình luận của bạn đã được gửi.',
      error: 'Không thể gửi. Vui lòng kiểm tra mã khách hàng.'
    },
    contactSection: {
      eyebrow: 'Liên hệ',
      title: 'Lên kế hoạch cho dự án tiếp theo.',
      description: 'Trao đổi với đội ngũ về phạm vi, thời gian và giải pháp phù hợp.',
      hoursTitle: 'Giờ gọi',
      hours: 'Thứ Hai–Thứ Sáu 8:00–18:00, Thứ Bảy 9:00–13:00 (AEST)',
      phoneTitle: 'WhatsApp + Điện thoại',
      phone: '+61 405 825 996',
      phoneNote: 'Nhanh nhất qua WhatsApp.',
      emailTitle: 'Email',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: 'Yêu cầu tư vấn',
      title: 'Yêu cầu tư vấn',
      description: 'Chia sẻ chi tiết dự án và đính kèm ảnh tham khảo.',
      nameLabel: 'Họ và tên',
      namePlaceholder: 'Tên của bạn',
      phoneLabel: 'Điện thoại / WhatsApp',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: 'Email',
      emailPlaceholder: 'ban@email.com',
      projectLabel: 'Mô tả dự án',
      projectPlaceholder: 'Vật liệu, kích thước, địa điểm, thời gian.',
      filesLabel: 'Ảnh tham khảo',
      filesHelper: 'Đính kèm bản vẽ hoặc ảnh hiện trạng (tuỳ chọn).',
      submit: 'Gửi yêu cầu',
      cancel: 'Huỷ',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: 'Yêu cầu tư vấn mới',
      emailIntro: 'Yêu cầu tư vấn mới từ website',
      noFiles: 'Không có tệp đính kèm'
    },
    footer: {
      eyebrow: 'Sẵn sàng bắt đầu?',
      title: 'Hãy xây dựng thứ bền vững.',
      sub: 'Bền chắc, chính xác, hoàn thiện tinh tế.',
      ctaPrimary: 'Xem dịch vụ',
      ctaSecondary: 'Xem dự án',
      brand: 'Dịch vụ hàn và gia công kim loại cao cấp cho hiệu năng và độ bền.',
      company: 'Công ty',
      contact: 'Liên hệ',
      credentials: 'Chứng nhận',
      credentialsItems: ['Có giấy phép & bảo hiểm', 'Chứng nhận AWS', 'An toàn tiêu chuẩn', 'Bảo hành dự án'],
      bottomLeft: '© 2024 WelDone. Đã đăng ký bản quyền.',
      bottomRight: ['Gia công chính xác', 'Giao đúng hạn']
    },
    language: 'Ngôn ngữ'
  },
  yue: {
    nav: { home: '首頁', services: '服務', projects: '項目', gallery: '相簿', process: '流程', faq: '常見問題' },
    hero: {
      eyebrow: '精準金屬工藝',
      title: '工業級實力，',
      titleAccent: '兼具格調。',
      description:
        '我們為高要求環境設計及製作高端金屬方案。每條焊縫都為性能而生，每個收尾都追求質感。',
      primaryCta: '查看服務',
      secondaryCta: '查看作品'
    },
    experience: {
      eyebrow: '認證專業團隊',
      title: '為嚴苛環境而設的匠心實力。',
      description:
        'WelDone 結合傳統工藝與精密工程，打造經得起時間考驗的項目。團隊專業、持證、重視細節。',
      pills: ['持牌及投保', '品質保證', '安全合規', '專屬項目管理'],
      stats: [
        { label: '經驗年數', value: '20+' },
        { label: '完成項目', value: '500+' },
        { label: '客戶滿意', value: '98%' },
        { label: '認證焊工', value: 'AWS' }
      ]
    },
    gallery: {
      eyebrow: '工場精選',
      title: '匠心進行中',
      description: '精選近期項目，展示完成度與細節品質。'
    },
    services: {
      eyebrow: '核心服務',
      title: '為規模化打造的精準服務。',
      description: '由設計至焊接，確保性能、安全及長期價值。',
      items: [
        { title: '訂製欄杆系統', description: '安全與美感兼備的建築級欄杆。' },
        { title: '雨棚及遮篷', description: '高端金屬，耐候保護。' },
        { title: '鋼結構製作', description: '工業及商業級完整製作。' },
        { title: '精密修復', description: '快速修復，恢復結構完整。' },
        { title: '裝飾金屬工藝', description: '為空間增添特色。' },
        { title: '重型焊接', description: '認證焊工，焊縫完美。' }
      ]
    },
    projects: {
      eyebrow: '作品集',
      title: '有存在感的項目',
      description: '每件作品都兼顧結構與精緻收尾。',
      items: [
        { title: '結構框架', description: '為重載而設的鋼結構。' },
        { title: '精密焊接', description: 'MIG、TIG 及電弧焊。' },
        { title: '建築金屬', description: '提升建築質感的金屬細節。' },
        { title: '工業維護', description: '維修與加固，延長壽命。' },
        { title: '訂製製作', description: '一對一設計與原型。' },
        { title: '高端表面處理', description: '保護並提升質感。' }
      ]
    },
    process: {
      eyebrow: '我們流程',
      title: '精煉流程帶來高端成果。',
      description: '以嚴謹管理每個階段，確保準時與品質。',
      steps: [
        { number: '01', title: '諮詢評估', description: '了解需求與時間規劃。' },
        { number: '02', title: '設計工程', description: '詳細圖紙與材料審核。' },
        { number: '03', title: '製作收尾', description: '精準製作及品質檢查。' },
        { number: '04', title: '安裝支援', description: '現場安裝與後續建議。' }
      ]
    },
    faq: {
      eyebrow: '常見問題',
      title: '開工前清晰解答',
      description: '常見問題與答案。',
      items: [
        { question: '你哋擅長邊類焊接？', answer: '主要係 MIG、TIG 同電弧焊。' },
        { question: '項目大概要幾耐？', answer: '視乎規模，我哋會提供清晰時間表。' },
        { question: '有免費報價嗎？', answer: '有，提供免費報價。' },
        { question: '有牌照同保險嗎？', answer: '有，齊全並由 AWS 認證焊工負責。' },
        { question: '可處理咩材料？', answer: '鋼、不銹鋼、鋁及特殊合金。' },
        { question: '有保養嗎？', answer: '有，條款會於合約列明。' }
      ]
    },
    comments: {
      eyebrow: '客戶分享',
      title: '已驗證客戶評論',
      description: '分享你同 WelDone 嘅體驗。發表需要有效客戶碼。',
      formTitle: '留下評論',
      nameLabel: '姓名',
      namePlaceholder: '你嘅姓名',
      codeLabel: '客戶碼',
      codePlaceholder: '輸入客戶碼',
      messageLabel: '評論',
      messagePlaceholder: '講下你嘅項目同成果。',
      submit: '發表評論',
      submitting: '提交中...',
      loading: '載入評論中...',
      empty: '暫時未有評論，歡迎率先分享。',
      success: '多謝！你的評論已提交。',
      error: '提交失敗，請檢查客戶碼。'
    },
    contactSection: {
      eyebrow: '聯絡',
      title: '一齊規劃你嘅下一個項目。',
      description: '同我哋團隊傾下範圍、時間同最合適嘅製作方案。',
      hoursTitle: '通話時間',
      hours: '週一至週五 8:00–18:00，週六 9:00–13:00（AEST）',
      phoneTitle: 'WhatsApp + 電話',
      phone: '+61 405 825 996',
      phoneNote: 'WhatsApp 回覆最快。',
      emailTitle: '電郵',
      email: 'hello@weldonestudio.com'
    },
    consult: {
      openCta: '申請諮詢',
      title: '申請諮詢',
      description: '請分享項目資料，並可附上參考相片。',
      nameLabel: '姓名',
      namePlaceholder: '你嘅姓名',
      phoneLabel: '電話 / WhatsApp',
      phonePlaceholder: '+61 405 825 996',
      emailLabel: '電郵',
      emailPlaceholder: 'you@email.com',
      projectLabel: '項目描述',
      projectPlaceholder: '材料、尺寸、地點同時間。',
      filesLabel: '參考相片',
      filesHelper: '可附上草圖或現場相片（可選）。',
      submit: '提交申請',
      cancel: '取消',
      emailTo: 'hello@weldonestudio.com',
      emailSubject: '新的諮詢申請',
      emailIntro: '來自網站的諮詢申請',
      noFiles: '未有附加檔案'
    },
    footer: {
      eyebrow: '準備開始？',
      title: '一齊打造長久之作。',
      sub: '為實力而造，為精準而設。',
      ctaPrimary: '查看服務',
      ctaSecondary: '查看作品',
      brand: '高端焊接及金屬製作服務，兼顧性能與耐用。',
      company: '公司',
      contact: '聯絡',
      credentials: '資質',
      credentialsItems: ['持牌及投保', 'AWS 認證', '安全合規', '項目保養'],
      bottomLeft: '© 2024 WelDone. 版權所有。',
      bottomRight: ['精密製作', '準時交付']
    },
    language: '語言'
  }
};

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文（普通话）' },
  { code: 'ar', label: 'العربية' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'yue', label: '粵語' }
];

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || 'https://xxbmifmkehnvryhkxefc.supabase.co';
const SUPABASE_KEY =
  process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_BQh5LlXsa8zJqSRVshCZrw_MOddF4YC';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const projectImages = [
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
  'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=1200&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80'
];

const serviceIcons = [Ruler, ShieldCheck, Factory, Wrench, Sparkles, Flame];
const statIcons = [Award, Briefcase, ThumbsUp, BadgeCheck];

const detectLanguage = () => {
  if (typeof navigator === 'undefined') return 'en';
  const prefs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  const normalized = prefs.map((lang) => lang.toLowerCase());

  const has = (prefixes) => normalized.some((lang) => prefixes.some((p) => lang.startsWith(p)));

  if (has(['ar'])) return 'ar';
  if (has(['vi'])) return 'vi';
  if (has(['es'])) return 'es';
  if (has(['yue'])) return 'yue';
  if (has(['zh-hk'])) return 'yue';
  if (has(['zh'])) return 'zh';
  return 'en';
};

const mergeLocale = (base, override) => {
  if (!override) return base;
  return {
    ...base,
    ...override,
    nav: { ...base.nav, ...(override.nav || {}) },
    hero: { ...base.hero, ...(override.hero || {}) },
    footer: { ...base.footer, ...(override.footer || {}) }
  };
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [showConsult, setShowConsult] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    files: []
  });
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState('');
  const [commentNotice, setCommentNotice] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    code: '',
    message: ''
  });

  useEffect(() => {
    const stored = window.localStorage.getItem('lang');
    if (stored && translations[stored]) {
      setLang(stored);
    } else {
      setLang(detectLanguage());
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    if (!showConsult) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setShowConsult(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [showConsult]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-anim]'));
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [lang]);

  const t = mergeLocale(translations.en, translations[lang]);
  const contact = t.contactSection || translations.en.contactSection;
  const consult = t.consult || translations.en.consult;
  const commentCopy = t.comments || translations.en.comments;

  const projects = useMemo(
    () =>
      t.projects.items.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: item.description,
        image: projectImages[index]
      })),
    [t]
  );

  const services = useMemo(
    () =>
      t.services.items.map((item, index) => ({
        title: item.title,
        description: item.description,
        icon: serviceIcons[index]
      })),
    [t]
  );

  const steps = useMemo(() => t.process.steps, [t]);
  const faqItems = useMemo(() => t.faq.items, [t]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setCommentsLoading(true);
      setCommentsError('');
      const { data, error } = await supabase
        .from('comments')
        .select('id, name, message, created_at, locale')
        .eq('approved', true)
        .eq('locale', lang)
        .order('created_at', { ascending: false })
        .limit(24);

      if (!active) return;
      if (error) {
        setCommentsError(error.message || 'Failed to load comments.');
        setComments([]);
      } else {
        setComments(data || []);
      }
      setCommentsLoading(false);
    };

    load();
    setCommentNotice('');
    return () => {
      active = false;
    };
  }, [lang]);

  const handleConsultChange = (field) => (event) => {
    const value = event.target.value;
    setConsultForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    setConsultForm((prev) => ({ ...prev, files }));
  };

  const handleConsultSubmit = (event) => {
    event.preventDefault();
    const { name, phone, email, description, files } = consultForm;
    const fileList = files.length ? files.map((file) => file.name).join(', ') : consult.noFiles;

    const body = [
      consult.emailIntro,
      '',
      `${consult.nameLabel}: ${name || '-'}`,
      `${consult.phoneLabel}: ${phone || '-'}`,
      `${consult.emailLabel}: ${email || '-'}`,
      `${consult.projectLabel}:`,
      description || '-',
      '',
      `${consult.filesLabel}: ${fileList}`
    ].join('\n');

    const mailto = `mailto:${consult.emailTo}?subject=${encodeURIComponent(
      consult.emailSubject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setShowConsult(false);
    setConsultForm({ name: '', phone: '', email: '', description: '', files: [] });
  };

  const handleCommentChange = (field) => (event) => {
    const value = event.target.value;
    setCommentForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setCommentSubmitting(true);
    setCommentNotice('');

    const payload = {
      name: commentForm.name.trim(),
      message: commentForm.message.trim(),
      client_code: commentForm.code.trim(),
      locale: lang
    };

    const { error } = await supabase.from('comments').insert(payload);

    if (error) {
      setCommentNotice(commentCopy.error);
    } else {
      setCommentNotice(commentCopy.success);
      setCommentForm({ name: '', code: '', message: '' });
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('id, name, message, created_at, locale')
        .eq('approved', true)
        .eq('locale', lang)
        .order('created_at', { ascending: false })
        .limit(24);

      if (!fetchError) {
        setComments(data || []);
      }
    }
    setCommentSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-ink text-white font-body">
      <nav className="fixed w-full z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src="/name2.png" alt="WelDone" className="h-10" />
              <span className="hidden sm:inline text-xs tracking-[0.35em] text-accent">WELDONE</span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
              <a href="#home" className="nav-link">{t.nav.home}</a>
              <a href="#services" className="nav-link">{t.nav.services}</a>
              <a href="#projects" className="nav-link">{t.nav.projects}</a>
              <a href="#gallery" className="nav-link">{t.nav.gallery}</a>
              <a href="#process" className="nav-link">{t.nav.process}</a>
              <a href="#faq" className="nav-link">{t.nav.faq}</a>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <label className="lang-label" htmlFor="lang">{t.language}</label>
              <select
                id="lang"
                className="lang-select"
                value={lang}
                onChange={(event) => setLang(event.target.value)}
              >
                {LANG_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden pb-6 pt-2 border-t border-white/10">
              <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em]">
                <a href="#home" className="nav-link">{t.nav.home}</a>
                <a href="#services" className="nav-link">{t.nav.services}</a>
                <a href="#projects" className="nav-link">{t.nav.projects}</a>
                <a href="#gallery" className="nav-link">{t.nav.gallery}</a>
                <a href="#process" className="nav-link">{t.nav.process}</a>
                <a href="#faq" className="nav-link">{t.nav.faq}</a>
              </div>
              <div className="lang-mobile">
                <label className="lang-label" htmlFor="lang-mobile">{t.language}</label>
                <select
                  id="lang-mobile"
                  className="lang-select"
                  value={lang}
                  onChange={(event) => setLang(event.target.value)}
                >
                  {LANG_OPTIONS.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden px-6 lg:px-12 hero-section">
        <div className="hero-glow"></div>
        <div className="hero-lines"></div>
        <div className="hero-content max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 relative z-10">
          <div className="space-y-8 animate-fade-up" data-anim="hero-reveal">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.4em] text-accent">
              {t.hero.eyebrow}
            </div>
            <h1 className="text-5xl md:text-6xl font-display leading-tight">
              {t.hero.title}
              <span className="block text-accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl">{t.hero.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button type="button" className="btn-primary" onClick={() => setShowConsult(true)}>
                {consult.openCta}
                <ChevronRight size={18} />
              </button>
              <a href="#projects" className="btn-secondary">{t.hero.secondaryCta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-blend">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12" data-anim="tilt-rise">
          <div className="space-y-6">
            <span className="eyebrow">{t.experience.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-display">{t.experience.title}</h2>
            <p className="text-muted text-lg">{t.experience.description}</p>
            <div className="flex flex-wrap gap-3">
              {t.experience.pills.map((pill, index) => (
                <span key={`pill-${index}`} className="pill">{pill}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {t.experience.stats.map((stat, index) => {
              const Icon = statIcons[index];
              return (
                <div key={`stat-${index}`} className="experience-card experience-card-light reveal-card">
                  <div className="text-4xl font-display text-accent">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted mt-2">{stat.label}</div>
                  <div className="experience-icon"><Icon size={20} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-light gallery-section">
        <div className="max-w-7xl mx-auto" data-anim="reveal-slice">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <span className="eyebrow-dark">{t.gallery.eyebrow}</span>
              <h2 className="text-4xl font-display text-ink">{t.gallery.title}</h2>
            </div>
            <p className="text-slate max-w-xl">{t.gallery.description}</p>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[...projects, ...projects].map((project, index) => (
              <div key={`${project.title}-${index}`} className="marquee-card">
                <img src={project.image} alt={project.title} />
                <div className="marquee-caption">
                  <h4 className="font-display text-lg">{project.title}</h4>
                  <p className="text-sm text-accent">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="max-w-7xl mx-auto" data-anim="stagger-pop">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-display">{t.services.title}</h2>
            </div>
            <p className="text-muted max-w-xl">{t.services.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={`service-${index}`} className="service-card service-card-light">
                  <div className="service-icon"><Icon size={22} /></div>
                  <h3 className="text-2xl font-display mt-6 mb-3">{service.title}</h3>
                  <p className="text-slate leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="section-dark-alt section-blend">
        <div className="max-w-7xl mx-auto" data-anim="shift-rise">
          <div className="portfolio-title text-center mb-12">
            <span className="eyebrow">{t.projects.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-display">{t.projects.title}</h2>
            <p className="text-muted mt-4">{t.projects.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="project-card">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <h3 className="text-2xl font-display">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section-light process-section">
        <div className="max-w-7xl mx-auto" data-anim="timeline-wave">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <span className="eyebrow-dark">{t.process.eyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-display text-ink">{t.process.title}</h2>
            </div>
            <p className="text-slate max-w-xl">{t.process.description}</p>
          </div>

          <div className="process-grid">
            {steps.map((step, index) => (
              <div key={`step-${index}`} className="process-card">
                <div className="process-number">{step.number}</div>
                <h3 className="text-2xl font-display text-ink mt-6 mb-3">{step.title}</h3>
                <p className="text-slate leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="max-w-7xl mx-auto contact-grid" data-anim="tilt-rise">
          <div className="contact-copy">
            <span className="eyebrow-dark">{contact.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-display text-ink">{contact.title}</h2>
            <p className="text-slate text-lg">{contact.description}</p>
            <div className="contact-meta">
              <a href="tel:+61405825996">
                <Phone size={16} />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`}>
                <Mail size={16} />
                {contact.email}
              </a>
            </div>
            <button type="button" className="btn-primary contact-cta" onClick={() => setShowConsult(true)}>
              {consult.openCta}
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-card-icon"><Clock size={20} /></div>
              <div>
                <h4>{contact.hoursTitle}</h4>
                <p>{contact.hours}</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon"><Phone size={20} /></div>
              <div>
                <h4>{contact.phoneTitle}</h4>
                <a href="tel:+61405825996">+61 405 825 996</a>
                <p>{contact.phoneNote}</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card-icon"><Mail size={20} /></div>
              <div>
                <h4>{contact.emailTitle}</h4>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-light process-section faq-light">
        <div className="max-w-5xl mx-auto" data-anim="accordion-float">
          <div className="text-center mb-12">
            <span className="eyebrow-dark">{t.faq.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-display">{t.faq.title}</h2>
            <p className="text-muted mt-4">{t.faq.description}</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem key={`faq-${index}`} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <section id="comments" className="section-dark-alt section-blend">
        <div className="max-w-7xl mx-auto comment-grid" data-anim="shift-rise">
          <div className="comment-copy">
            <span className="eyebrow">{commentCopy.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-display">{commentCopy.title}</h2>
            <p className="text-muted text-lg">{commentCopy.description}</p>
            <div className="comment-form-card">
              <h3>{commentCopy.formTitle}</h3>
              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <label>
                  <span>{commentCopy.nameLabel}</span>
                  <input
                    type="text"
                    value={commentForm.name}
                    onChange={handleCommentChange('name')}
                    placeholder={commentCopy.namePlaceholder}
                    required
                  />
                </label>
                <label>
                  <span>{commentCopy.codeLabel}</span>
                  <input
                    type="text"
                    value={commentForm.code}
                    onChange={handleCommentChange('code')}
                    placeholder={commentCopy.codePlaceholder}
                    required
                  />
                </label>
                <label className="comment-field-full">
                  <span>{commentCopy.messageLabel}</span>
                  <textarea
                    value={commentForm.message}
                    onChange={handleCommentChange('message')}
                    placeholder={commentCopy.messagePlaceholder}
                    required
                  />
                </label>
                <button type="submit" className="btn-primary" disabled={commentSubmitting}>
                  {commentSubmitting ? commentCopy.submitting : commentCopy.submit}
                </button>
                {commentNotice && <p className="comment-notice">{commentNotice}</p>}
              </form>
            </div>
          </div>
          <div className="comment-list">
            {commentsLoading && <p className="comment-status">{commentCopy.loading}</p>}
            {!commentsLoading && commentsError && (
              <p className="comment-status">{commentsError}</p>
            )}
            {!commentsLoading && !commentsError && comments.length === 0 && (
              <p className="comment-status">{commentCopy.empty}</p>
            )}
            {comments.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong>{comment.name}</strong>
                  <span>
                    {new Date(comment.created_at).toLocaleDateString(lang, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p>{comment.message}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showConsult && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowConsult(false)}
        >
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="modal-eyebrow">{consult.openCta}</p>
                <h3 className="modal-title">{consult.title}</h3>
                <p className="modal-sub">{consult.description}</p>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowConsult(false)}
                aria-label={consult.cancel}
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <form className="modal-form" onSubmit={handleConsultSubmit}>
                <div className="modal-grid">
                  <label className="modal-field">
                    <span>{consult.nameLabel}</span>
                    <input
                      className="modal-input"
                      type="text"
                      value={consultForm.name}
                      onChange={handleConsultChange('name')}
                      placeholder={consult.namePlaceholder}
                      required
                    />
                  </label>
                  <label className="modal-field">
                    <span>{consult.phoneLabel}</span>
                    <input
                      className="modal-input"
                      type="tel"
                      value={consultForm.phone}
                      onChange={handleConsultChange('phone')}
                      placeholder={consult.phonePlaceholder}
                    />
                  </label>
                  <label className="modal-field modal-field-full">
                    <span>{consult.emailLabel}</span>
                    <input
                      className="modal-input"
                      type="email"
                      value={consultForm.email}
                      onChange={handleConsultChange('email')}
                      placeholder={consult.emailPlaceholder}
                      required
                    />
                  </label>
                  <label className="modal-field modal-field-full">
                    <span>{consult.projectLabel}</span>
                    <textarea
                      className="modal-textarea"
                      value={consultForm.description}
                      onChange={handleConsultChange('description')}
                      placeholder={consult.projectPlaceholder}
                      required
                    />
                  </label>
                  <label className="modal-field modal-field-full">
                    <span>{consult.filesLabel}</span>
                    <div className="file-drop">
                      <input
                        className="file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFilesChange}
                        aria-label={consult.filesLabel}
                      />
                      <div className="file-copy">
                        <strong>{consult.filesLabel}</strong>
                        <p>{consult.filesHelper}</p>
                      </div>
                    </div>
                    {consultForm.files.length > 0 && (
                      <p className="file-list">{consultForm.files.map((file) => file.name).join(', ')}</p>
                    )}
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {consult.submit}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setShowConsult(false)}>
                    {consult.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="footer-cta">
            <div>
              <p className="footer-eyebrow">{t.footer.eyebrow}</p>
              <h3 className="footer-heading">{t.footer.title}</h3>
              <p className="footer-sub">{t.footer.sub}</p>
            </div>
            <div className="footer-cta-actions">
              <a href="#services" className="footer-btn">{t.footer.ctaPrimary}</a>
              <a href="#projects" className="footer-btn footer-btn-outline">{t.footer.ctaSecondary}</a>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/name2.png" alt="WelDone" className="h-10" />
              <p className="text-sm text-muted mt-4">{t.footer.brand || translations.en.footer.brand}</p>
            </div>
            <div className="footer-links">
              <h4 className="footer-title">{t.footer.company}</h4>
              <a href="#services">{t.nav.services}</a>
              <a href="#projects">{t.nav.projects}</a>
              <a href="#process">{t.nav.process}</a>
              <a href="#projects">{t.projects.eyebrow}</a>
            </div>
            <div className="footer-links">
              <h4 className="footer-title">{t.footer.contact}</h4>
              <span>{contact.phone}</span>
              <span>{contact.email}</span>
              <span>125 Street, USA</span>
            </div>
            <div className="footer-links">
              <h4 className="footer-title">{t.footer.credentials}</h4>
              {(t.footer.credentialsItems || translations.en.footer.credentialsItems).map((item, index) => (
                <span key={`cred-${index}`}>{item}</span>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <span>{t.footer.bottomLeft}</span>
            <div className="footer-mini">
              {(t.footer.bottomRight || translations.en.footer.bottomRight).map((item, index) => (
                <span key={`foot-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/61405825996"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="whatsapp-wave"></span>
        <span className="whatsapp-wave wave-delay"></span>
        <span className="whatsapp-badge"></span>
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
