const EXTERNAL = "external";
const PAGE_URL = "pageUrl";
const SUBMIT = "onSubmit";
const CLICK = "onClick";
window.targets = {
    ProductAddToCart:{model: EXTERNAL},
    CatalogCategoryHospitalVisit:{
        model: PAGE_URL,
        arguments: {
            url: "apteka=1159",
            strict: false
        }
    },
    FeedbackRareSubmit: {model: EXTERNAL},
    FeedbackCallSubmit: {model: EXTERNAL},
    FeedbackQuestionSubmit: {model: EXTERNAL},
    FeedbackErrorSubmit: {model: EXTERNAL},
    FeedbackReviewSubmit: {model: EXTERNAL},
    FeedbackSubscribeSubmit: {model: EXTERNAL},
    FeedbackReviewPageFormSubmit: {model: EXTERNAL},
    FeedbackPostOrderReviewSubmit: {model: EXTERNAL},
    FeedbackPharmacyPageSubmit: {model: EXTERNAL},
    StageCartVisit: {
        model: PAGE_URL,
        arguments: {
            url: "/cart",
            strict: false
        }
    },
    StageGeoVisit: {
        model: PAGE_URL,
        arguments: {
            url: "/geo",
            strict: false
        }
    },
    StageOrderVisit: {
        model: PAGE_URL,
        arguments: {
            url: "/order",
            strict: false
        }
    },
    StageOrderSubmit: {
        model: SUBMIT,
        arguments:{
            element: ".stages__order__main-form"
        }
    },
    CatalogCategoryMedicineVisit: {
        model: PAGE_URL,
        arguments: {
            url: "/lekarastva/",
            strict: false
        }
    }
}