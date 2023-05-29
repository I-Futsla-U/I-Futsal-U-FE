import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PlaceSearch {
  data: { [key: string]: string }[];
  status: string | null;
  pagination: number;
}

interface Marker {
  position: { La: number; Ma: number };
}

export default function useKakaoMap() {
  const { data: inputValue } = useQuery({
    queryKey: ["inputValue"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const [listItems, setListItems] = useState([] as PlaceSearch["data"]);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(mapScript);
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        let markers: any[] = [];
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.541, 126.986),
          level: 5,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT,
        );

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 검색관련 객체 및 함수 생성부분입니다.
        const ps = new window.kakao.maps.services.Places();
        if (inputValue) {
          ps.keywordSearch(inputValue, placesSearchCB);
        }
        function placesSearchCB(
          data: PlaceSearch["data"],
          status: PlaceSearch["status"],
        ) {
          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
            setListItems(data);

            // 페이지 번호를 표출합니다
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        }

        // 검색 결과 목록과 마커를 표출하는 함수입니다
        function displayPlaces(places: PlaceSearch["data"]) {
          const bounds = new window.kakao.maps.LatLngBounds();

          // 지도에 표시되고 있는 마커를 제거합니다
          removeMarker();

          for (let i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시합니다
            const placePosition = new window.kakao.maps.LatLng(
              places[i].y,
              places[i].x,
            );
            addMarker(placePosition);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }

        // 마커를 생성하고 지우는 함수들입니다.
        function addMarker(position: Marker["position"]) {
          const imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            imageSize = new window.kakao.maps.Size(24, 35), // 마커 이미지의 크기
            markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
            ),
            marker = new window.kakao.maps.Marker({
              position: position, // 마커의 위치
              image: markerImage,
            });
          marker.setMap(map); // 지도 위에 마커를 표출합니다
          markers.push(marker); // 배열에 생성된 마커를 추가합니다
          return marker;
        }
        function removeMarker() {
          for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        }
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, [inputValue]);

  return listItems;
}