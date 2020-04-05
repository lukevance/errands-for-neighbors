module.exports.getAction = actionName => {
    switch (actionName) {
        case "confirm_order":
            return [
                {
                  "say": "Thank you, we will notify you when a volunteer has claimed your request."
                },
                {
                  "redirect": "https://enx3kyff9qzn.x.pipedream.net/"
                }
              ];
        case "collect_order":
            return [
                {
                    "collect": {
                        "name": "order_info",
                        "questions": [
                            {
                                "question": "What address should we deliver your items to?",
                                "name": "address"
                            },
                            {
                                "question": "Please list all items that you need.",
                                "name": "order_items"
                            },
                            {
                                "question": "Are there any other things you'd like your delivery volunteer to know?",
                                "name": "extra_instructions"
                            }
                        ],
                        "on_complete": {
                            "redirect": "task://confirm_order"
                        }
                    }
                }
            ];
        default:
            return [
                {"redirect": "task://confirm_order"}
            ];
    }
}