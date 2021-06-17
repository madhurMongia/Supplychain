pragma experimental ABIEncoderV2;
pragma solidity ^0.5.0;

contract supplyChain {

    //utility functions
       function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

      function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {

    return string(abi.encodePacked(a, ',', b, ',', c));

}

    ////////variables
   uint256 public productCount =0;

   mapping(uint256 => Product) public Products;

    struct Product {
        uint256 id;
        address owner;
        string name;
        uint256 currentLocation;
        uint256 date;
        mapping(uint256 => string) Locations;
    }

    //////////////events
    event ProductAdded( uint256 id,
        address owner,
        string name,
        uint currentLocation,
        uint256 date);

    event locationChanged(uint256 id, 
     string currentLocation);

    event Info( string info);

    //////modifiers
    modifier owner_only(uint _id){
        require(msg.sender == Products[_id].owner);
        _;
    }
    /////main methods
    function addProduct(string memory _name)  public returns (bool){

        require( bytes(_name).length > 0);
        productCount++;
        Products[productCount] = Product(productCount , msg.sender, _name, 0,block.timestamp);

        emit ProductAdded(productCount , msg.sender,_name, 0,block.timestamp);
        return true;
    }

    function changeLocation( string memory _location  , uint256 _id, address _new_owner) public owner_only(_id){

         Product storage  _product = Products[_id];
         _product.currentLocation++;
         _product.Locations[_product.currentLocation] = _location;
         _product.owner = _new_owner;
         Products[_id] = _product;

         emit locationChanged( _id, 
     _location);

    }

    function fetchInfo( uint256  _id)public view returns(string memory) {

        string memory _info  = append(
            Products[_id].name,
            Products[_id].Locations[Products[_id].currentLocation],
           uint2str(Products[_id].date));
        return _info;
    }

     function fetchAddress( uint _id) public view returns (address){
        
        address str = Products[_id].owner;
        return str;
    }

    function fetchAllLocation( uint _id) public view returns (string[15] memory){
        uint cLocat = Products[_id].currentLocation;
        string[15] memory temp;
        for( uint i = 0 ; i <=cLocat;i++){
            temp[i] = Products[_id].Locations[i];
        }
        return temp;
    }
}