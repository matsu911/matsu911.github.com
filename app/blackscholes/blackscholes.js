google.load("jquery", "1.7.1");

function round(x, digits) {
    x = x * Math.pow(10, digits);
    x = Math.round(x);
    return x / Math.pow(10, digits);
}

function N(x) {
    var a1 = 0.31938153, a2 = -0.356563782, a3 = 1.781477937;
    var a4 = -1.821255978, a5 = 1.330274429;

    var L = Math.abs(x);
    var K = 1.0 / (1.0 + 0.2316419 * L);
    var w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) * Math.exp(-L *L / 2) * (a1 * K + a2 * K *K + a3 * Math.pow(K,3) + a4 * Math.pow(K,4) + a5 * Math.pow(K,5));

    if(x < 0)
	return 1.0 - w;
    else
	return w;
}

function d1(S, K, s, r, t, T) {
    return (Math.log(S/K) + (r + s * s / 2) * (T - t)) / (s * Math.sqrt(T - t));
}

function d2(S, K, s, r, t, T) {
    return (Math.log(S/K) + (r - s * s / 2) * (T - t)) / (s * Math.sqrt(T - t));
}

function Call(S, K, s, r, t, T) {
    return S * N(d1(S, K, s, r, t, T)) - K * Math.exp(-r * (T - t)) * N(d2(S, K, s, r, t, T));
}

function Put(S, K, s, r, t, T) {
    return K * Math.exp(-r * (T - t)) * N(-d2(S, K, s, r, t, T)) - S * N(-d1(S, K, s, r, t, T)) ;
}

function select_calculator() {
    if($('input[name=calc_type]:checked').val() == 'call')
	return Call;
    else
	return Put;
}

function update() {
    var S = parseFloat($('#spot').attr("value"));
    var K = parseFloat($('#strike').attr("value"));
    var s = parseFloat($('#sigma').attr("value"));
    var r = parseFloat($('#ccir').attr("value"));
    var T = parseFloat($('#maturity').attr("value"));
    $('#result').attr("value", round(select_calculator()(S, K, s, r, 0, T), 4));
    if($('input[name=calc_type]:checked').val() == 'call')
	$('#formula').html("C = S N(d<sub>1</sub>) - K e<sup>-rT</sup> N(d<sub>2</sub>)");
    else
	$('#formula').html("P = K e<sup>-rT</sup> N(-d<sub>2</sub>) - S N(-d<sub>1</sub>)");
}

window.onload = function() {
    var S = 100;
    var K = 110;
    var s = 0.1;
    var r = 0.1;
    var T = 1.0;

    $('#spot').attr("value", S);
    $('#strike').attr("value", K);
    $('#sigma').attr("value", s);
    $('#ccir').attr("value", r);
    $('#maturity').attr("value", T);
   
    var ids = ['#spot', '#strike', '#sigma', '#ccir', '#maturity'];
    for(var i = 0; i < ids.length; i += 1) {
	$(ids[i]).keyup(update).keyup();
    }
    $('input[name=calc_type]').change(update);

    update();
};
