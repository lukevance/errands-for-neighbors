const getAction = actionName => {
    switch (actionName) {
        case "confirm_order":
            return [
                {
                  "say": "Thank you, we will notify you when a volunteer has claimed your request."
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
        case "new_request":
            return [
                {
                    "say": "Please have your shopping list ready, as well as any additional instructions and your delivery address. Are you ready to place your order?"
                },
                {
                    "listen": {
                        "tasks": [
                            "collect_order",
                            "goodbye"
                        ]
                    }
                }
            ];
        default:
            return [
                {"redirect": "task://confirm_order"}
            ];
    };
};

module.exports = {getAction};