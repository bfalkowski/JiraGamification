import { Epic, Issue } from '@jira-gamification/core';

export class BacklogSeeder {
  /**
   * Generate a synthetic backlog with realistic issues and dependencies
   */
  static seedBacklog(): { epics: Epic[]; issues: Issue[] } {
    const epics = this.generateEpics();
    const issues = this.generateIssues(epics);
    
    return { epics, issues };
  }

  /**
   * Generate core epics
   */
  private static generateEpics(): Epic[] {
    return [
      {
        id: 'ONBOARDING',
        name: 'User Onboarding',
        description: 'Complete user registration, authentication, and profile setup flow',
        priority: 'High'
      },
      {
        id: 'PAYMENTS',
        name: 'Payment Processing',
        description: 'Secure payment gateway integration and transaction handling',
        priority: 'High'
      },
      {
        id: 'REPORTING',
        name: 'Analytics & Reporting',
        description: 'Business intelligence dashboards and data analytics',
        priority: 'Medium'
      },
      {
        id: 'NOTIFICATIONS',
        name: 'Communication & Notifications',
        description: 'Email, SMS, and in-app notification systems',
        priority: 'Medium'
      }
    ];
  }

  /**
   * Generate issues with realistic dependencies
   */
  private static generateIssues(epics: Epic[]): Issue[] {
    const issues: Issue[] = [
      // ONBOARDING EPIC
      {
        id: 'PROJ-101',
        epic: 'ONBOARDING',
        title: 'User registration form',
        description: 'Create user registration form with email validation',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'High',
        labels: ['frontend', 'forms', 'validation'],
        dependencies: [],
        businessValue: 80
      },
      {
        id: 'PROJ-102',
        epic: 'ONBOARDING',
        title: 'Email verification system',
        description: 'Implement email verification workflow for new users',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'High',
        labels: ['backend', 'email', 'security'],
        dependencies: ['PROJ-101'],
        businessValue: 90
      },
      {
        id: 'PROJ-103',
        epic: 'ONBOARDING',
        title: 'User profile setup',
        description: 'Allow users to complete their profile information',
        storyPoints: 3,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['frontend', 'profile', 'forms'],
        dependencies: ['PROJ-102'],
        businessValue: 60
      },
      {
        id: 'PROJ-104',
        epic: 'ONBOARDING',
        title: 'Welcome tutorial',
        description: 'Interactive tutorial for new users',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'Low',
        labels: ['frontend', 'tutorial', 'ux'],
        dependencies: ['PROJ-103'],
        businessValue: 40
      },

      // PAYMENTS EPIC
      {
        id: 'PROJ-201',
        epic: 'PAYMENTS',
        title: 'Payment gateway integration',
        description: 'Integrate with Stripe payment gateway',
        storyPoints: 13,
        status: 'Backlog',
        priority: 'High',
        labels: ['backend', 'payments', 'stripe', 'security'],
        dependencies: ['PROJ-102'], // User must be verified
        businessValue: 100
      },
      {
        id: 'PROJ-202',
        epic: 'PAYMENTS',
        title: 'Payment form UI',
        description: 'Create payment form with card input and validation',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'High',
        labels: ['frontend', 'payments', 'forms', 'stripe'],
        dependencies: ['PROJ-201'],
        businessValue: 85
      },
      {
        id: 'PROJ-203',
        epic: 'PAYMENTS',
        title: 'Transaction processing',
        description: 'Handle payment processing and confirmation',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'High',
        labels: ['backend', 'payments', 'transactions'],
        dependencies: ['PROJ-201'],
        businessValue: 95
      },
      {
        id: 'PROJ-204',
        epic: 'PAYMENTS',
        title: 'Payment history',
        description: 'Display user payment history and receipts',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['frontend', 'payments', 'history'],
        dependencies: ['PROJ-203'],
        businessValue: 70
      },
      {
        id: 'PROJ-205',
        epic: 'PAYMENTS',
        title: 'Refund processing',
        description: 'Handle refund requests and processing',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['backend', 'payments', 'refunds'],
        dependencies: ['PROJ-203'],
        businessValue: 75
      },

      // REPORTING EPIC
      {
        id: 'PROJ-301',
        epic: 'REPORTING',
        title: 'Transaction data model',
        description: 'Design database schema for transaction analytics',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['backend', 'database', 'analytics'],
        dependencies: ['PROJ-203'], // Need transactions first
        businessValue: 65
      },
      {
        id: 'PROJ-302',
        epic: 'REPORTING',
        title: 'Revenue dashboard',
        description: 'Create revenue analytics dashboard for admins',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['frontend', 'dashboard', 'analytics', 'revenue'],
        dependencies: ['PROJ-301'],
        businessValue: 80
      },
      {
        id: 'PROJ-303',
        epic: 'REPORTING',
        title: 'User activity metrics',
        description: 'Track and display user engagement metrics',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'Low',
        labels: ['backend', 'analytics', 'metrics'],
        dependencies: ['PROJ-301'],
        businessValue: 55
      },
      {
        id: 'PROJ-304',
        epic: 'REPORTING',
        title: 'Export functionality',
        description: 'Allow users to export reports in CSV/PDF format',
        storyPoints: 3,
        status: 'Backlog',
        priority: 'Low',
        labels: ['backend', 'export', 'reports'],
        dependencies: ['PROJ-302'],
        businessValue: 45
      },

      // NOTIFICATIONS EPIC
      {
        id: 'PROJ-401',
        epic: 'NOTIFICATIONS',
        title: 'Email service setup',
        description: 'Configure email service provider (SendGrid)',
        storyPoints: 3,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['backend', 'email', 'sendgrid'],
        dependencies: [],
        businessValue: 50
      },
      {
        id: 'PROJ-402',
        epic: 'NOTIFICATIONS',
        title: 'Payment confirmation emails',
        description: 'Send payment confirmation emails to users',
        storyPoints: 5,
        status: 'Backlog',
        priority: 'Medium',
        labels: ['backend', 'email', 'payments'],
        dependencies: ['PROJ-203', 'PROJ-401'],
        businessValue: 70
      },
      {
        id: 'PROJ-403',
        epic: 'NOTIFICATIONS',
        title: 'In-app notifications',
        description: 'Real-time in-app notification system',
        storyPoints: 8,
        status: 'Backlog',
        priority: 'Low',
        labels: ['frontend', 'backend', 'notifications', 'websockets'],
        dependencies: ['PROJ-401'],
        businessValue: 60
      },
      {
        id: 'PROJ-404',
        epic: 'NOTIFICATIONS',
        title: 'Notification preferences',
        description: 'Allow users to configure notification settings',
        storyPoints: 3,
        status: 'Backlog',
        priority: 'Low',
        labels: ['frontend', 'settings', 'notifications'],
        dependencies: ['PROJ-403'],
        businessValue: 40
      }
    ];

    return issues;
  }
}
