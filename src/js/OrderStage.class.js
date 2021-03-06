import { Config, DefineConst } from "./config";
import { Service } from "./Service.class";
import { Debug } from "./Debug.class";

class OrderStage{
    static checkbox = null;
    static promo = null;
    static form = null;
    static init(){
        this.confirmPolicyCheck();
        this.promoInit();
        this.form = $(".stages__order__main-form");
        this.form.on("submit", (e) => {
            e.preventDefault();
            console.log('SUBMIT');
            this.generateOrder();
        });
    }
    static promoInit(){
        this.promo = new Promo({
            form: $(".stage__order__promo"),
            props: {
                successPromoHandler: (resp) => {
                    $(".js-order-price").html(`
                        <div style="display: inline-block">
                            <div class="price-now">${resp.conditions.currentPrice}</div>
                        </div>
                    `);
                }
            }
        }).init();
    }
    static generateOrder(){
        let formArray = this.form.serializeArray();
        let formData = {};
        formArray.forEach(item => {
            formData[item.name] = item.value
        });
        formData = Object.assign(formData, {
            promo: this.promo.currentCode,
            ctx: "web"
        });
        let orderAddData =  {
            key: "phone",
            value: formData.phone,
            ms2_action: "order/add",
            ctx: "web"
        }
        formData['m2_action'] = "order/add";
        console.log(formData);
        $.post(Config.dataRequest.minishop2, orderAddData).then(resp => {
            Debug.log(JSON.parse(resp), "Add Order Response", this);
            $.post(Config.dataRequest.minishop2, Object.assign(formData, {
                ms2_action: "order/submit"
            })).then((resp) => {        
                let response = JSON.parse(resp);
                Debug.log(response, "Submit Order Response", this);
                if(response.success){
                    if (response.data['redirect']) {
                        document.location.href = response.data['redirect'];
                    }
                    else if (response.data['msorder']) {
                        location.href = `/order?action=${Service.getQueryParams().action}&msorder=${response.data.msorder}`;
                    }
                    else {
                        location.reload();
                    }
                } else {
                    Toast.createToast({
                        type: DefineConst.STATUS_ERROR,
                        content: "Ошибка оформления заказа"
                    });
                }
                
            });
        })
        /*
        
        */
    }
    static confirmPolicyCheck(){
        let $element = $("#order-policy-confirm");
        let $orderButton = $("#order-button");
        UIController.awaitReady($element).then((controller) => {            
            console.warn("!!!");
            controller.addListener('onCheckActive',() => {
                $orderButton.prop("disabled",false);
                $orderButton.removeClass("button_disabled");
            });
            controller.addListener('onCheckDeactive',() => {
                $orderButton.prop("disabled",true);
                $orderButton.addClass("button_disabled");
            });
            if(controller.isChecked) controller.callListeners('onCheckActive');
            else controller.callListeners('onCheckDeactive');

        });
        this.checkbox = UIController.getControllerByElement($element);
    }
}
export { OrderStage };