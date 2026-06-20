const Project = require('../models/Project');

// GET /api/projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const { tech, search } = req.query;
    let filter = { isActive: true };

    if (tech && tech !== 'All') {
      filter.techTags = { $in: [tech] };
    }
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects (admin)
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (admin)
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    res.json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (admin)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    res.json({ success: true, message: 'Project removed.' });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects/seed (admin - seed initial 12 projects)
exports.seedProjects = async (req, res, next) => {
  try {
    const projects = [
      { title: 'Student Management System', shortDesc: 'Manage student records, attendance, grades and more.', description: 'A comprehensive student management system with modules for enrollment, attendance tracking, grade management, and report generation. Supports multiple user roles including admin, teacher, and student.', techTags: ['Java', 'PHP', 'Python'], price: 999, originalPrice: 1499, features: ['Student enrollment & profiles', 'Attendance tracking', 'Grade management', 'Report generation', 'Multi-role login', 'Export to PDF/Excel'] },
      { title: 'E-Commerce Website', shortDesc: 'Full-featured online store with cart, payment, and admin panel.', description: 'A modern e-commerce platform with product listings, shopping cart, user authentication, payment integration, and an admin dashboard for managing products and orders.', techTags: ['React', 'PHP', 'Node.js'], price: 1499, originalPrice: 2499, features: ['Product catalog', 'Shopping cart', 'User auth', 'Payment gateway', 'Order tracking', 'Admin dashboard'] },
      { title: 'Library Management System', shortDesc: 'Issue, return, and track books with ease.', description: 'A library management system that handles book issuing, returning, fine calculation, member management, and search functionality for books and members.', techTags: ['Java', 'Python'], price: 799, originalPrice: 1299, features: ['Book issue & return', 'Fine calculation', 'Member management', 'Search functionality', 'Reports', 'Barcode support'] },
      { title: 'Hospital Management System', shortDesc: 'Manage patients, doctors, appointments and billing.', description: 'Comprehensive hospital management covering patient registration, doctor scheduling, appointment booking, ward management, and billing with invoice generation.', techTags: ['PHP', 'Java'], price: 1299, originalPrice: 1999, features: ['Patient registration', 'Doctor management', 'Appointment booking', 'Ward management', 'Billing & invoices', 'Lab reports'] },
      { title: 'Online Quiz App', shortDesc: 'Create and take quizzes with real-time results.', description: 'An interactive quiz application where admins can create question banks and quizzes, and students can take timed quizzes with immediate results and leaderboards.', techTags: ['React', 'Node.js'], price: 899, originalPrice: 1399, features: ['Question bank', 'Timed quizzes', 'Multiple choice', 'Real-time results', 'Leaderboard', 'Admin panel'] },
      { title: 'Bank Management System', shortDesc: 'Core banking operations with account management.', description: 'A banking system simulation covering account creation, deposits, withdrawals, fund transfers, transaction history, and interest calculation.', techTags: ['Java', 'C++'], price: 999, originalPrice: 1499, features: ['Account management', 'Deposits & withdrawals', 'Fund transfers', 'Transaction history', 'Interest calculation', 'Statement generation'] },
      { title: 'Inventory Management System', shortDesc: 'Track stock, suppliers and purchase orders.', description: 'An inventory system for tracking products, managing suppliers, processing purchase orders, monitoring stock levels, and generating inventory reports.', techTags: ['PHP', 'Python'], price: 799, originalPrice: 1299, features: ['Stock tracking', 'Supplier management', 'Purchase orders', 'Low stock alerts', 'Inventory reports', 'Barcode scanning'] },
      { title: 'Hotel Booking System', shortDesc: 'Room booking, availability and reservation management.', description: 'A hotel booking platform with room listings, availability calendar, online reservations, check-in/check-out management, and billing.', techTags: ['React', 'Node.js'], price: 1199, originalPrice: 1799, features: ['Room listings', 'Availability calendar', 'Online booking', 'Check-in/out', 'Billing', 'Reviews'] },
      { title: 'Attendance Management System', shortDesc: 'Mark and track attendance with reports.', description: 'An attendance management system for educational institutions with biometric/manual marking, real-time tracking, parent notifications, and detailed reports.', techTags: ['PHP', 'Java'], price: 699, originalPrice: 1199, features: ['Manual/auto marking', 'Real-time tracking', 'Parent notifications', 'Monthly reports', 'Leave management', 'Export reports'] },
      { title: 'Chat Application', shortDesc: 'Real-time messaging with rooms and notifications.', description: 'A real-time chat application built with Socket.IO supporting private messages, group rooms, file sharing, online status, and push notifications.', techTags: ['Node.js', 'React'], price: 1099, originalPrice: 1599, features: ['Real-time messaging', 'Group rooms', 'File sharing', 'Online status', 'Push notifications', 'Message history'] },
      { title: 'Food Ordering App', shortDesc: 'Order food online with live tracking.', description: 'A food delivery application with restaurant listings, menu management, cart, online ordering, real-time order tracking, and delivery management.', techTags: ['React', 'Node.js'], price: 1399, originalPrice: 2199, features: ['Restaurant listings', 'Menu management', 'Cart & orders', 'Live tracking', 'Payment integration', 'Rating & reviews'] },
      { title: 'Employee Management System', shortDesc: 'HR system for employee records, payroll and leaves.', description: 'A complete HR management system covering employee profiles, payroll processing, leave management, performance tracking, and HR reporting.', techTags: ['PHP', 'Java'], price: 1099, originalPrice: 1699, features: ['Employee profiles', 'Payroll processing', 'Leave management', 'Performance tracking', 'Department management', 'HR reports'] },
    ];

    await Project.deleteMany({});
    const created = await Project.insertMany(projects);
    res.json({ success: true, message: `${created.length} projects seeded.`, projects: created });
  } catch (error) {
    next(error);
  }
};
