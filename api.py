@frappe.whitelist(allow_guest=True)
def handle_razorpay_webhook():
    form_dict = frappe.local.form_dict
    payload = frappe.request.get_data()

    verify_webhook_signature(payload)  # for security purposes

    # Get payment details (check Razorpay docs for object structure)
    payment_entity = form_dict["payload"]["payment"]["entity"]
    razorpay_order_id = payment_entity["order_id"]
    razorpay_payment_id = payment_entity["id"]
    customer_email = payment_entity["email"]
    event = form_dict.get("event")

    # Process the order
    ebook_order = frappe.get_doc("eBook Order", {"razorpay_order_id": razorpay_order_id})
    if event == "payment.captured" and ebook_order.status != "Paid":
        ebook_order.update(
            {
                "razorpay_payment_id": razorpay_payment_id,
                "status": "Paid",
                "customer_email": customer_email,
            }
        ) # Mark as paid and set payment_id and customer_email
        ebook_order.save(ignore_permissions=True)
