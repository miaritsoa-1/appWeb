const sendEmail = require('./sendEmail');

exports.sendPayslipEmail = (email, payslip) => {
    const message = `Your payslip for this month: ${payslip}`;

    sendEmail({
        email,
        subject: 'Monthly Payslip',
        message
    });
};
