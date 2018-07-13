angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, uppercaseFilter, $location ) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = [
        {nome: uppercaseFilter("Pedro"), telefone: "9999-8888", data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
        {nome: "Ana", telefone: "9999-8877", data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
        {nome: "Maria", telefone: "9999-8866", data: new Date(), operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}}
    ];
    $scope.operadoras = [
        {nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
        {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
        {nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
        {nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
        {nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
    ];
    
    $scope.adicionarContato = function (contato) {
        $scope.contatos.push(angular.copy(contato));
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
        $location.path("/contatos");
    };
    
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    var init = function() {
        calcularImpostos($scope.contatos);
    };
    
    calcularImpostos = function (contatos){
        contatos.forEach(function(contato) {
        contato.operadora.precoComImposto = calcularImpostos(contato.operadora.preco);
        });
        console.log(contatos)
    };

    var calcularImposto = function (preco) {
        var imposto = 1.2;
        return preco * imposto;
    };
    
    
    
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };
});