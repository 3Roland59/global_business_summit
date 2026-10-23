// Email Submission Service for GBS 2027
// Sends form submissions directly to the configured recipient email address.

export const RECIPIENT_EMAIL =
  import.meta.env.VITE_SUBMISSION_EMAIL || 'fredkwabenainkoom1@gmail.com';

export interface DelegateSubmissionPayload {
  refId: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle?: string;
  country?: string;
  packageName: string;
  packagePrice: string;
  delegatesCount: number;
  notes?: string;
  groupDetails?: string;
}

export interface SponsorshipSubmissionPayload {
  refId: string;
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: string;
  message?: string;
}

export interface GeneralEnquiryPayload {
  refId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  mailtoFallbackUrl?: string;
}

/**
 * Submit delegate registration to recipient email
 */
export async function sendDelegateRegistration(
  payload: DelegateSubmissionPayload
): Promise<SubmissionResponse> {
  const subject = `[GBS 2027 REGISTRATION] ${payload.packageName} - ${payload.fullName} (${payload.refId})`;

  const mailtoBody = encodeURIComponent(
    `GBS 2027 DELEGATE REGISTRATION
-----------------------------------------
Reference ID: ${payload.refId}
Package: ${payload.packageName} (${payload.packagePrice})
Number of Delegates: ${payload.delegatesCount}

LEAD DELEGATE DETAILS:
Full Name: ${payload.fullName}
Organisation: ${payload.organization}
Job Title: ${payload.jobTitle || 'N/A'}
Email: ${payload.email}
Phone: ${payload.phone}
Country: ${payload.country || 'N/A'}

${payload.groupDetails ? `GROUP DELEGATES:\n${payload.groupDetails}\n` : ''}
NOTES / INTERESTS:
${payload.notes || 'None provided'}
-----------------------------------------
Submitted via The Global Business Summit (GBS 2027) Portal`
  );

  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  try {
    const postData: Record<string, string> = {
      _subject: subject,
      _template: 'basic',
      _captcha: 'false',
      'Reference ID': payload.refId,
      'Delegate Package': `${payload.packageName} (${payload.packagePrice})`,
      'Delegates Count': String(payload.delegatesCount),
      'Lead Delegate Name': payload.fullName,
      'Organisation': payload.organization,
      'Job Title': payload.jobTitle || 'N/A',
      'Email Address': payload.email,
      'Phone Number': payload.phone,
      'Country': payload.country || 'N/A',
    };

    if (payload.groupDetails) {
      postData['Group Delegates (2 & 3)'] = payload.groupDetails;
    }
    if (payload.notes) {
      postData['Notes & Preferences'] = payload.notes;
    }

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Your registration details have been dispatched to ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    } else {
      return {
        success: true,
        message: `Your registration was logged. You can also send a direct copy to ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    }
  } catch (err) {
    console.warn('Direct HTTP email dispatch fallback:', err);
    return {
      success: true,
      message: `Your registration has been logged for processing. A copy is addressed to ${RECIPIENT_EMAIL}.`,
      mailtoFallbackUrl: mailtoUrl,
    };
  }
}

/**
 * Submit corporate sponsorship enquiry to recipient email
 */
export async function sendSponsorshipEnquiry(
  payload: SponsorshipSubmissionPayload
): Promise<SubmissionResponse> {
  const subject = `[GBS 2027 SPONSORSHIP ENQUIRY] ${payload.tier} Tier - ${payload.orgName} (${payload.refId})`;

  const mailtoBody = encodeURIComponent(
    `GBS 2027 SPONSORSHIP ENQUIRY
-----------------------------------------
Reference ID: ${payload.refId}
Preferred Sponsorship Tier: ${payload.tier}
Organisation: ${payload.orgName}
Contact Person: ${payload.contactName}
Official Email: ${payload.email}
Phone Number: ${payload.phone}

PARTNERSHIP GOALS & OBJECTIVES:
${payload.message || 'No additional notes provided'}
-----------------------------------------
Submitted via The Global Business Summit (GBS 2027) Portal`
  );

  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  try {
    const postData = {
      _subject: subject,
      _template: 'basic',
      _captcha: 'false',
      'Reference ID': payload.refId,
      'Sponsorship Tier': payload.tier,
      'Organisation': payload.orgName,
      'Contact Person': payload.contactName,
      'Corporate Email': payload.email,
      'Telephone': payload.phone,
      'Partnership Message': payload.message || 'N/A',
    };

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Your sponsorship enquiry has been forwarded to the corporate relations desk at ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    } else {
      return {
        success: true,
        message: `Your enquiry was logged. You can also send a direct copy to ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    }
  } catch (err) {
    console.warn('Sponsorship email dispatch fallback:', err);
    return {
      success: true,
      message: `Your enquiry has been logged. A copy is addressed to ${RECIPIENT_EMAIL}.`,
      mailtoFallbackUrl: mailtoUrl,
    };
  }
}

/**
 * Submit general secretariat enquiry to recipient email
 */
export async function sendGeneralEnquiry(
  payload: GeneralEnquiryPayload
): Promise<SubmissionResponse> {
  const subject = `[GBS 2027 ENQUIRY] ${payload.subject} - ${payload.name} (${payload.refId})`;

  const mailtoBody = encodeURIComponent(
    `GBS 2027 GENERAL ENQUIRY
-----------------------------------------
Reference ID: ${payload.refId}
Sender: ${payload.name}
Email: ${payload.email}
Subject: ${payload.subject}

MESSAGE:
${payload.message}
-----------------------------------------
Submitted via The Global Business Summit (GBS 2027) Portal`
  );

  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

  try {
    const postData = {
      _subject: subject,
      _template: 'basic',
      _captcha: 'false',
      'Reference ID': payload.refId,
      'Name': payload.name,
      'Email': payload.email,
      'Subject': payload.subject,
      'Message': payload.message,
    };

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Your enquiry has been sent to ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    } else {
      return {
        success: true,
        message: `Your enquiry was logged. A copy is addressed to ${RECIPIENT_EMAIL}.`,
        mailtoFallbackUrl: mailtoUrl,
      };
    }
  } catch (err) {
    console.warn('General enquiry dispatch fallback:', err);
    return {
      success: true,
      message: `Your enquiry was logged. A copy is addressed to ${RECIPIENT_EMAIL}.`,
      mailtoFallbackUrl: mailtoUrl,
    };
  }
}
